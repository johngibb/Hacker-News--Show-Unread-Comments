MarkVisitedLinks(GetAllLinks());

TrackVisibleLinks(function(visibleLinks){
  window.setTimeout(function(){
    var stillVisible = visibleLinks.filter(':inview');
    stillVisible.each(function(){
      MarkRead($(this));
      AddLinkId(getId($(this)))
    })
  }, 1000);
});