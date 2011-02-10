TrackVisibleLinks(function(visibleLinks){
  MarkVisitedLinks(visibleLinks)
})

function MarkRead(link){
  SetIsNew(link, false);
  AddLinkId(getId(link))
}

TrackVisibleLinks(function(visibleLinks){
  window.setTimeout(function(){
    var stillVisible = visibleLinks.filter(':inview');
    stillVisible.each(function(){
      MarkRead($(this));
    })
  }, 1000);
});