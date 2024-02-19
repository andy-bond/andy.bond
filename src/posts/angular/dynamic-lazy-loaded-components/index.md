---
title: Dynamic Lazy Loaded Components
description: Lazy loading a module via the routing is a breeze - but what if you
  want to dynamically load a component without using routing?
date: 2022-03-17
prism: true
---

## Update 3/27/2022

Removed the compiler dependency in the `lazyWidget` directive - Thanks to [@profanis on GitHub](https://github.com/andy-bond/widget-dashboard-demo/issues/1) for pointing this out!

Also added a "fancy" dashboard to show how you can make a user customizable dashboard using this technique - just add the ability for a user to save their configuration and you'll have a pretty sweet setup! 😎

## TLDR;

In a hurry? Check out the [Widget Dashboard GitHub Repository](https://github.com/andy-bond/widget-dashboard-demo) or [View the Widget Dashboard Demo](https://andy.bond/apps/widget-dashboard) that I explain in detail below!

The interesting bits of code are the `lazy-widget.directive.ts` that you can find in the [in the repository here](https://github.com/andy-bond/widget-dashboard-demo/blob/main/src/app/widgets/utilities/directives/lazy-widget.directive.ts).

## The Problem

Angular makes it super easy to lazy load a module using the `RouterModule`, but what about the times where you only want a component to appear under certain conditions?

Obviously the quick and dirty solution is to just use `*ngIf` or `display: none` to prevent the component from appearing on the screen, but unfortunately that means that the component will be loaded in the app's bundle regardless of whether it is being used or not. This isn't always a big deal - but if there are large dependencies in the component, you could be adding megabytes to your bundle for something that few people will ever see!

## The Solution

Take a quick look at the `lazyWidget` directive - we'll go through it in-depth below!

```ts
// Use like <ng-template [lazyWidget]="WIDGET_NAME_HERE"></ng-template>
// Where WIDGET_NAME_HERE is a key in the injected WIDGET_CONFIGURATION token
@Directive({
	selector: '[lazyWidget]',
})
export class LazyWidgetDirective implements AfterViewInit {
	@Input() lazyWidget!: string;

	constructor(private viewContainerRef: ViewContainerRef, @Inject(WIDGET_CONFIGURATION) private widgetConfiguration: WidgetConfiguration) {
		this.viewContainerRef.createComponent(WidgetLoadingComponent);
	}

	ngAfterViewInit() {
		this.load(this.lazyWidget);
	}

	async load(id: string) {
		// Check if widget exists
		if (id && this.widgetConfiguration.hasOwnProperty(id)) {
			// Get widget from configuration
			const widget = this.widgetConfiguration[id];

			// Import the module
			const module = await widget.import();

			// Check that the module extends our LazyWidget class
			if (isWidgetModule(module)) {
				// Get the component to load
				const component = module.entry;

				// Clear the container
				this.viewContainerRef.clear();

				// Load the component in the container
				const componentRef = this.viewContainerRef.createComponent(component);

				// Mark for Check
				componentRef.changeDetectorRef.markForCheck();
			}
		} else {
			// Clear Spinner & Show Not Found
			this.viewContainerRef.clear();
			this.viewContainerRef.createComponent(WidgetNotFoundComponent);
		}
	}
}
```

## Explanation

In the snippet below, we have some of the basic items needed to create our directive as well as some injected services that we'll need. We also have one lifecycle hook that we use to ensure we load our component after the ViewContainer is available in `ngAfterViewInit`.

Notice that the `@Input` is named the same as the selector for our directive - this allows us to pass our input string and apply the directive in a more concise way.

The only other things of note here are the injected services.

- `viewContainerRef` is the view that our component will be placed in.
- `widgetConfiguration` is a token of our own making that will contain a map to the lazy loaded components.

Finally, the `this.viewContainerRef.createComponent(WidgetLoadingComponent);` simply creates a loading spinner component to start us out with.

```ts
@Directive({
  selector: '[lazyWidget]',
})
export class LazyWidgetDirective implements AfterViewInit {
  @Input() lazyWidget!: string;

  constructor(
    private viewContainerRef: ViewContainerRef,
    @Inject(WIDGET_CONFIGURATION) private widgetConfiguration: WidgetConfiguration
  ) {
    this.viewContainerRef.createComponent(WidgetLoadingComponent);
  }

  ngAfterViewInit() {
    this.load(this.lazyWidget);
  }
...
```

When `ngAfterViewInit` is triggered, we enter the interesting part - our `load` function.

The [Widget Dashboard - GitHub Repository](https://github.com/andy-bond/widget-dashboard-demo) contains all of the code needed to fully understand what is going on here, including the utility classes & functions I've used such as `isWidgetModule`.

Most of the code below has been commented for clarity, but the interesting part is the compilation of the module our component is declared in. This version of Angular requires that a component be declared in a module, so that is where our process must begin. Our module may contain many other components & providers, but the important part for our "WidgetModule" is that it must contain a property that points to the component we want to load - I've named this property `entry` (similar to the old `entryComponents`).

Our `load` function above will check that the widget we've selected conforms to the `WidgetModule` class and grab the `entry` property. After that we just clear the container, load our component using `createComponent`, before finally ensuring we call `markForCheck` to ensure that Angular's change detection picks up that our view has changed.

```ts
async load(id: string) {
  // Check if widget exists
  if (id && this.widgetConfiguration.hasOwnProperty(id)) {
    // Get widget from configuration
    const widget = this.widgetConfiguration[id];

    // Import the module
    const module = await widget.import();

    // Check that the module extends our LazyWidget class
    if (isWidgetModule(module)) {
      // Get the component to load
      const component = module.entry;

      // Clear the container
      this.viewContainerRef.clear();

      // Load the component in the container
      const componentRef = this.viewContainerRef.createComponent(component);

      // Mark for Check
      componentRef.changeDetectorRef.markForCheck();
    }
  } else { // Widget doesn't exist in our configuration
    // Clear Spinner & Show Not Found
    this.viewContainerRef.clear();
    this.viewContainerRef.createComponent(WidgetNotFoundComponent);
  }
}
```

## Even Better News?

Angular 14 will make a lot of this code no longer necessary! The introduction of standalone components in Angular 14 will enable us to load a component through a much simpler API without having to invoke the compiler to compile our module.

Example code below taken from the [RFC on Standalone Components](https://github.com/angular/angular/discussions/43784#:~:text=Components%3A%20lazy%20loading%20and%20instantiation).

```ts
@Component({
	selector: 'app-component',
	template: 'dynamically loaded: ',
})
export class AppComponent {
	constructor(private vcRef: ViewContainerRef) {}

	ngOnInit() {
		import('./path/to/component').then((m) => {
			this.vcRef.createComponent(m.StandaloneComponent);
		});
	}
}
```

## Update: Fancier Dashboard

I added a fancier dashboard just for fun - [check it out here](https://andy.bond/apps/widget-dashboard/#/fancy)!

This fancier dashboard lets you drag around widgets (grab the header) and resize them. If you were going to use this for a "real" dashboard, you'd probably want to save the user's preferences after they arrange the dashboard to suit their needs!
