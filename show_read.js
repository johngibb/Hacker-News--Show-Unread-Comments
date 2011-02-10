var links = $('a[href^=item?id=]');

AddLinkId(1778913);
AddLinkId(1778742);

TrackVisitedLinks(links)

TrackVisibleLinks(function(visibleLinkIds){
  console.log("Visible: " + visibleLinkIds.join(", "));
})