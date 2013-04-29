# gridify.js

Retinise.js is a really simple jQuery plugin which 'retinises' your inline images, and because it uses 'data-src' instead of 'src' it means it only ever serves up the image you need, saving you and your users bandwidth. It's really small and really easy, just follow the steps below.
Please post your feedback to let me know what you think! I'd love to know if you are using it on your site, tweet me the URL and any comments you have @dahliacreative / #retinisejs.


## Head
```html
<script src=”/path/to/jquery.js”></script>
<script src=”/path/to/gridify.js”></script>
<!--Optional Dependancy-->
<script src=”/path/to/waitforimages.js”></script>
```

## HTML
```html
<div id="grid">
  <a href="/demo/demo1.html" class="gridItem"><img src="http://placehold.it/320" alt=""></a>
</div>
```

## HTML CONTENT
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
