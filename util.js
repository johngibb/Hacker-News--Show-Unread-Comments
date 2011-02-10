$.extend($.expr[':'],{
    inview: function(a) {
        var st = (document.documentElement.scrollTop || document.body.scrollTop),
            ot = $(a).offset().top,
            wh = (window.innerHeight && window.innerHeight < $(window).height()) ? window.innerHeight : $(window).height();
        return ot > st && ($(a).height() + ot) < (st + wh);
    }
});

function ArraysEqual(a, b){
  return a.length == b.length && a.join("|") == b.join("|");
}

function getId(link){
  return link.attr('href').replace(/.*=/, '');
}

function GetAllLinks(){
  return $('a[href^=item?id=]');
}

function GetVisibleLinks(){
  return GetAllLinks().filter(':inview');
}

function GetVisibleLinkIds(){
  return GetVisibleLinks().map(function(){
    return getId($(this));
  }).toArray();
}

function TrackVisibleLinks(callback){
  var prevLinkIds = [];
  $(document).scroll(function(){
    var visibleLinkIds = GetVisibleLinkIds();
    if (!ArraysEqual(prevLinkIds, visibleLinkIds)){
      callback(visibleLinkIds);
    }
    prevLinkIds = visibleLinkIds;
  });
}