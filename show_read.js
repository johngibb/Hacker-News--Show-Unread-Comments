var links = $('a[href^=item?id=]');


TrackNewlyVisibleLinks(function(visibleLinks){
  window.setTimeout(function(){
    MarkVisitedLinks(visibleLinks)
  }, 500);
})