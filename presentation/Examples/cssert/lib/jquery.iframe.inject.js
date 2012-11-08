      $.fn.inject = function(content) {
        return $(this).filter("iframe").each(function() { 
          var doc = this.contentDocument || this.document || this.contentWindow.document; 
          doc.open(); 
          doc.writeln(content); 
          doc.close(); 
        });
      }

