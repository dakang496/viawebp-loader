 /**
  *  inspired by 
  *  https://github.com/scottjehl/picturefill
  *  https://developers.google.com/speed/webp/faq#which_web_browsers_natively_support_webp
  */
 function checkSupport(callback) {
   var img = new Image();
   img.onload = function () {
     var result = img.width === 1;
     callback(result);
   };
   img.onerror = function () {
     callback(false);
   }
   img.src = 'data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==';
 }

 var detect = {
   isSupport: function () {
     if (typeof window === 'undefined') {
       return false;
     }
     //  if (typeof module !== 'undefined' && module.exports) {
     //    return false;
     //  }
     checkSupport(function (supported) {
       detect.isSupport = function () {
         return supported;
       }
     });
     return 0;
   }
 }

 if (typeof window !== 'undefined') {
   detect.isSupport();
 }

 module.exports = detect;