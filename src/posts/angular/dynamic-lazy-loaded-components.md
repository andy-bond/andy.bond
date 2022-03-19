---
title: Dynamic Lazy Loaded Components
description: Lazy loading a module via the routing is a breeze - but what if you
  want to dynamically load a component without using routing?
date: 2022-03-17
image: src/static/img/post-lazy-load-component-1.jpg
prism: true
category: angular
---
## TLDR;

In a hurry? Check out the [Widget Dashboard - GitHub Repository]() that I explain in detail below! 

The interesting bits of code are the <code class="language-">lazy-widget.directive.ts</code> that you can find in the <code class="language-">src/app/widgets/utilities/directives/</code> folder.

## The Problem

Angular makes it super easy to lazy load a module using the <code class="language-">RouterModule</code>, but what about the times where you only want a component to appear under certain conditions? 

Obviously the quick and dirty solution is to just use <code class="language-">*ngIf</code> or <code class="language-css">display: none</code> to prevent the component from appearing on the screen, but unfortunately that means that the component will be loaded into the application regardless of whether it is being used or not. This isn't always a big deal - but if there are large dependencies in the component, you could be adding megabytes to your bundle for something that few people will ever see!

## The Solution

```ts
@Directive({
  selector: '[lazyWidget]',
})
export class LazyWidgetDirective implements AfterViewInit {
  @Input() lazyWidget!: string;

  constructor(
    private compiler: Compiler,
    private viewContainerRef: ViewContainerRef,
    @Inject(WIDGET_CONFIGURATION) private widgetConfiguration: WidgetConfiguration
  ) {
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

      // Compile the Module
      const moduleFactory = await this.compiler.compileModuleAsync(module);

      // Check that the module extends our LazyWidget class
      if (isWidgetModule(moduleFactory.moduleType)) {
        // Get the component to load
        const component = moduleFactory.moduleType.entry;

        // Clear the container
        this.viewContainerRef.clear();

        // Load the component in the container
        const componentRef = this.viewContainerRef.createComponent(
          component
        );

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
