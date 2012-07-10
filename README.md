jquery-listticker
====================
ticked the li elements of your documents.

This is the jquery plugin that displays li elements like news ticker.

If you want to set the easing option name to the 'easing' option, you require
including jQuery Easing plugin (http://gsgd.co.uk/sandbox/jquery/easing/).

for example
-----------
```javascript
$('ul#listticker').listticker();
// or
$('ul#listticker').listticker({
  type: 'slideleft',
  duration: 1200,
  removeduration: 600,
  delay: 3000,
  easing: 'easeOutQuart'
});
```

Options
-------
+ `type` :  
  the kind of ticker, 'fade', 'slideleft' or 'slideup'. Default is 'fade'.
+ `duration` :  
  the period time(millisecond) of moving elements. Default is 1200ms.
+ `removeduration` :  
  the period time(millisecond) of removing elements. Default is a half of duration's value(above).
+ `delay` :  
  the delay time(millisecond) of next action. Default is 3000ms.
+ `easing` :  
  the easing function name but you require the jQuery Easing plugin. Default is  the action as same as 'easeOutQuart'.

License
-------
You may use this under the terms of either MIT License or
GNU General Public License (GPL) Version 2. (same as jQuery).

### Copyright
Copyright (c) MIYAGINO.net. All Rights Reserved.
