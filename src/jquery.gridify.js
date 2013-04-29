(function($){
  $.fn.extend({

    gridify: function(params) {

      var defaults = {
            gridItem:       '.gridItem',
            waitForImages:  false,
            ajaxId:         '#page',
            errorMsg:       'The requested content could not be loaded.',
            initialize:     function() {},
            contentLoaded:  function() {}
          };

      var popped        = ('state' in window.history && window.history.state !== null),
          initialURL    = location.href,
          options       = $.extend(defaults, params),
          gridItem      = $(options.gridItem),
          gridWrapper   = $(this),
          gridCount     = 0,
          oldPosition   = 0,
          firstViewport = true,
          working       = false;

      // Grid Item Click
      gridItem.not('[href^=http], [href^=https], [href^=#]').on('click', function(e) {
        e.preventDefault();
        var gridItem    = $(this),
            gridLink    = gridItem.attr('href'),
            activeLink  = $('.gridify-active');

        if(working === false && !gridItem.hasClass('gridify-active')) {
          working = true;
          activeLink.removeClass('gridify-active');
          gridItem.addClass('gridify-loading');
          history.pushState(null, null, gridLink);
          methods.calcPosition(gridItem);
        } else if(gridItem.hasClass('gridify-active')) {
          gridItem.removeClass('gridify-active');
          history.pushState(null, null, initialURL);
          methods.closeViewport();
        }
      });

      // Gridify Methods
      var methods = {

        // Initialize
        innit: function() {
          methods.generateGridItems();
          methods.checkViewport();
          methods.browserNav();
        },

        // Check viewport
        checkViewport: function() {
          var viewport = $('.gridify-viewport');
          if(viewport.length > 0 ) {
            firstViewport = false;
          }
        },

        // Generate grid Items
        generateGridItems: function() {
          gridItem.each(function() {
            if(!$(this).attr('data-gridify-id')) {
              gridCount++;
              $(this).attr('data-gridify-id', gridCount);
            }
          });
        },

        // Bind forward / back buttons
        browserNav: function() {
          $(window).bind('popstate', function() {
            popped = true;
            if(!popped && location.href === initialURL) {
              options.initialize();
            } else if(location.href === initialURL && firstViewport === true) {
              methods.closeViewport();
            } else {
              methods.findLink();
            }
          });
        },

        // Generate viewport
        generateViewport: function() {
          return '<section class="gridify-viewport new" stlye="display: none;"><div class="gridify-content"></div></section>';
        },

        // Generate error
        generateError: function() {
          return '<section id="' + options.ajaxId.replace('#', '') + '"><p class="error">' + options.errorMsg + '</p></section>';
        },

        // Close viewport
        closeViewport: function() {
          var viewport = $('.gridify-viewport');

          oldPosition   = 0;
          firstViewport = true;

          viewport.slideUp(function() {
            viewport.remove();
          });
        },

        // Find link
        findLink: function() {
          var link      = window.location.pathname,
              gridItem  = $('.gridItem[href="' + link + '"]');

          working = true;
          gridItem.addClass('gridify-loading');
          methods.calcPosition(gridItem);
        },

        // Calculate viewport position
        calcPosition: function(gridItem) {
          var viewport      = $('.gridify-viewport'),
              gridWidth     = gridWrapper.width(),
              gridItemWidth = gridItem.width(),
              columns       = Math.round(gridWidth/gridItemWidth),
              myPosition    = parseInt(gridItem.attr('data-gridify-id'), 10),
              myColumn      = Math.round((gridItem.offset().left-gridWrapper.offset().left)/gridItemWidth+1),
              newPosition   = Math.round(myPosition+(columns-myColumn)),
              direction;

          if(newPosition > oldPosition) {
            direction = 'down';
          } else {
            direction = 'up';
          }
          if(newPosition !== oldPosition) {
            oldPosition = newPosition;
            viewport.addClass('old').removeClass('new');
            $('.gridItem[data-gridify-id="' + newPosition + '"]').after(methods.generateViewport());
          }
          methods.loadContent(gridItem, direction);
        },

        // Load content
        loadContent: function(gridItem, direction) {
          var data      = window.location.pathname + " " + options.ajaxId,
              viewport  = $('.gridify-viewport.new .gridify-content');
          viewport.parent().css('height', viewport.parent().height());
          viewport.fadeOut(function() {
            viewport.load(data, function(response, status) {
              if(status === 'success') {
                if(options.waitForImages === true) {
                  viewport.waitForImages(function() {
                    methods.displayContent(gridItem, direction);
                  });
                } else {
                  methods.displayContent(gridItem, direction);
                }
              } else {
                viewport.html(methods.generateError());
                methods.displayContent(gridItem, direction);
              }
            });
          });
        },

        // Display content
        displayContent: function(gridItem, direction) {
          var content     = $('.gridify-viewport.new .gridify-content'),
              oldViewport = $('.gridify-viewport.old'),
              viewport    = $('.gridify-viewport.new'),
              activeLink  = $('.gridItem.gridify-loading'),
              offset      = 0;

          activeLink.removeClass('gridify-loading').addClass('gridify-active');
          if(direction === 'down') {
            offset = gridItem.offset().top - oldViewport.height();
          } else {
            offset = gridItem.offset().top;
          }

          if(oldViewport.length > 0) {
            content.show();
            $('html, body').animate({scrollTop: offset});
            oldViewport.slideUp(function() {
              oldViewport.remove();
            });
            viewport.css('height', 'auto');
            viewport.slideDown(function() {
              options.contentLoaded(viewport);
            });
          } else if(firstViewport === true) {
            firstViewport = false;
            content.show();
            $('html, body').animate({scrollTop: offset});
            viewport.css('height', 'auto');
            viewport.slideDown(function() {
              options.contentLoaded(viewport);
            });
          } else {
            viewport.animate({'height': content.outerHeight(true)});
            content.fadeIn(function() {
              options.contentLoaded(viewport);
            });
          }
          working = false;
        }

      };

      methods.innit();

    }

  });

})(jQuery);