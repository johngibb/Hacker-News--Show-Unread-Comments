$.extend($.expr[':'],{
    inview: function(a) {
        var st = (document.documentElement.scrollTop || document.body.scrollTop),
            ot = $(a).offset().top,
            wh = (window.innerHeight && window.innerHeight < $(window).height()) ? window.innerHeight : $(window).height();
        return ot > st && ($(a).height() + ot) < (st + wh);
    }
});

$.extend($.fn, { 
  forEach: function(callback){
    $(this).each(function(){ 
      callback($(this));
    });
    return $(this);
  }
});

function GetLinkId(link){
  return link.attr('href').replace(/.*=/, '');
}

function GetAllLinks(){
  return $('a[href^=item?id=]');
}

function MarkNew(link){
  var link = $(link);
  link.after( 
    $('<span>')
      .addClass('new-article')
      .css('color', 'red')
      .css('font-weight', 'bold')
      .html(" *NEW")
  );
}

function MarkRead(link){
  $(link)
    .next('span.new-article')
    .css('font-weight', 'normal');
}

