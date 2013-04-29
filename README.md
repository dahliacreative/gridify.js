# gridify.js

Gridify.js is a jQuery plugin which creates an AJAX gridsystem similar to that of Google images with some added extras.

The plugin:
* Uses the HTML 5 History API
* AJAXes in content
* Enables functioning forward/back buttons
* Uses smooth dynamic animations
* Is SEO freindly
* Customisable
* Has initialize and loadedContent callbacks
* Uses [WaitForImages](https://github.com/alexanderdickson/waitForImages) to allow content to be fully loaded before displaying

Please post your feedback to let me know what you think! I'd love to know if you are using it on your site, tweet me the URL and any comments you have @dahliacreative / #gridifyjs.


## Head
```html
<script src=”/path/to/jquery.js”></script>
<script src=”/path/to/gridify.js”></script>
<!--Optional Dependancy by Alexander Dickson-->
<script src=”/path/to/waitforimages.js”></script>
```

## GRID HTML
```html
<div id="grid">
  <a href="/demo/demo1.html" class="gridItem"><img src="http://placehold.it/320" alt=""></a>
</div>
```

## CONTENT HTML
```html
<section class="gridify-viewport new">
  <div class="gridify-content">
    <div id="page">
      <p>Page content</p>
    </div>
  </div>
</section>
<div id="grid">
  <a href="/demo/demo1.html" class="gridItem"><img src="http://placehold.it/320" alt=""></a>
</div>
```

## JS
```js
$('#grid').gridify();
```

## Options
```js
gridItem:       '.gridItem',
waitForImages:  false,
ajaxId:         '#page',
errorMsg:       'The requested content could not be loaded.',
initialize:     function() {},
contentLoaded:  function() {}
```

## License

Copyright 2012+ Simon Sturgess.

## Support

[Website](http://www.dahliacreative.com/gridifyjs/) | 
[Twitter](http://www.twitter.com/dahliacreative)
