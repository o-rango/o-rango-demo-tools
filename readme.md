[![Build Status](https://travis-ci.org/o-rango/orango-demo-tools.svg?branch=master)](https://travis-ci.org/o-rango/orango-demo-tools)
[![Coverage Status](https://coveralls.io/repos/github/o-rango/orango-demo-tools/badge.svg?branch=master)](https://coveralls.io/github/o-rango/orango-demo-tools?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/1deb8aa719ba4df0be9a650626dc7340)](https://www.codacy.com/app/romulocintra/orango-demo-tools?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=o-rango/orango-demo-tools&amp;utm_campaign=Badge_Grade)




> Breaking change UNPKG : 
 To correctly load library  from UNPKG use 1.0.0 version :
```html 
  <script async src="https://unpkg.com/@o-rango/orango-demo-tools@1.0.0/dist/orango-demo-tools.js"></script>
```


# o-rango: o-demo-bar  
[DEMO](https://o-rango.github.io/o-rango-demo-tools/)

 Simple and customizable showcase for your components built with Stenciljs :metal:
## Getting Started

o-demo-bar is a simple and flexible  demo bar component for developers and showcase your components, heavily  inspired in [storybook.js.org](https://storybook.js.org) having the main goal  to work directly with all JS  frameworks, being based in web component standards and built with stencilsjs.

### Initial working version
![](./o-demo-bar.gif)

## Install

### Script tag

- Put a script tag similar to this ``` <script src="https://unpkg.com/@o-rango/orango-demo-tools/dist/orango-demo-tools.js"></script>``` in the head of your index.html
- Then you can add o-demo-case tags in your code 

### Node Modules
- Run ```npm install o-rango/orango-demo-tools --save-dev```
- Put a script tag similar to this ```<script src='@o-rango/orango-demo-tools/dist/orango-demo-tools.js'></script>``` in the head of your index.html
- Then you can add o-demo-case tags in your code


## Usage 

### Simple usage with no dependencies and 2 demo cases

after include o-demo-tools in your index.html you can start building your demos using the following code and add script tags for your demos 

```html
    <o-demo-bar name="Material Demo">
         <o-demo-case name="Buttons Click">
           <template>
          <button onClick="showMe(event)">click me </button>
              <script> 
                  function showMe(evt){
                      alert(evt);
                  }
              </script>
               <template>
         <o-demo-case>

        <o-demo-case name="Buttons Alert">
           <template>
           <button onClick="showMe2(event)">click me </button>
              <script> 
                  function showMe2(evt){
                      alert(evt);
                  }
              </script>
               <template>
         <o-demo-case>
    </o-demo-bar>
```


```html
    <o-demo-bar name="Material Demo">
      <o-demo-case name="Placeholders Rounded Avatar">
          <template>
          <script src="https://unpkg.com/@o-rango/o-content-placeholder@0.1.1/dist/o-content-placeholder.js"></script>

          <style>
              // Place Your Styles
              .container {
                background-color: white;
                width: 90%;
                margin: auto auto;
                padding: 20px 25px 25px 20px;
                margin-bottom: 20px;
              }
            </style>
             <div class="container">
                <o-content-placeholder-img size="55" animate="true" format="circle"></o-content-placeholder-img>
                <o-content-placeholder-block line-height="10" random-size="true" animate="true" lines="5"></o-content-placeholder-block>
            </div>
          </template>
    </o-demo-case>
          ... all your demo cases 
    </o-demo-bar>
```


###  Listen events from your components

If you want o-demo-bar to listen certain events from your components just add the your events with events attribute and a toast will show the payload of the event when triggered

```html
    <o-demo-bar name="Material Demo" events="myEvents,myAnotherEvent">
    </o-demo-bar>
```

## RoadMap / Todo's

* [x] Add resizer options for mobiles using  [Marvel Devices](https://marvelapp.github.io/devices.css/)
* [x] Fix and improve desktop resizer inspired in [Resizer](https://material.io/resizer/#device=window&url=https%3A%2F%2Fwww.android.com%2F&width=840)
* Add posibility to change background color and patterns in context menu 
* [x] Store Preferences in localstorage 
* Show Code panel


## Contributing

We welcome contributions to O-RANGO projects!

-   ⇄ Pull requests and ★ Stars are always welcome.

