function FindAndMarkUnreadLinks(){
  var links = GetAllLinks();
  links.each(function(){
    var link = $(this);
    CheckLinkId(getId(link), function(isRead){
      if (!isRead) MarkNew(link);
    });
  })
}

TrackVisibleLinks(function(visibleLinks){
  window.setTimeout(function(){
    var stillVisible = visibleLinks.filter(':inview');
    stillVisible.each(function(){
      MarkRead($(this));
      AddLinkId(getId($(this)))
    })
  }, 1000);
});

FindAndMarkUnreadLinks();