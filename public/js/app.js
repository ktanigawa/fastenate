// .content_container .content_image{
//   background-image: url()

$(document).ready(function(){
  // alert("ready");
  // getArticles();
  // when "my boards" is clicked
  $(".my_boards_btn").click(function(event){
    getArticles("/api/my_boards.json");
  });
  // when "random" is clicked
  $(".random_btn").click(function(event){
    getArticles("/api/random.json");
  });
  // when get the app is clicked
  $(".get_app_btn").click(function(event){
    getArticles("/api/get_the_app.json");
  });
});

function getArticles( url ) {
  $(".container").empty();
  // gets the data from the json file with the data argument
  $.get( url, function( data ) {
    var articles = data.data.children;
    // it will loop through each variable articles
    $.each( articles, function(index, article){
      // console.log(article.data);
      // in the container div, each article.data is appended in var newBox
    var newBox = renderBox( article.data );
    $(".container").append(newBox);  
    });
  });
}

function renderBox( article_data ){
  // the outermost container element
  var content_container = $("<div>", { "class" : "content_container"});
  
  // creates the image div
  var content_image = $("<div>", { "class" : "content_image"});
  // set the background image to article_data.url
  content_image.css("background-image", "url('"+ article_data.url +"')");
  // add the image to the box
  content_container.append(content_image);

  // create the tagline, and add the article_data.title to it
  var title = $("<div>",
    {
      "class" : "title",
      html : article_data.title
    });
  content_container.append(title);

  // BELOW NOT SURE HOW TO GET updated data#@
  var info = $("<div>", 
    {
      "class" : "info",
      html : article_data.info
    });
  content_container.append(info);
  

  var authored = $("<ul>", 
    { 
      "class" : "authored",
     });
  info.append(authored);

  var by_line = $("<li>",
    {
      "class" : "by_line",
      html : article_data.author
    });
  authored.append(by_line);

  var time_ago = $("<li>",
    {
      "class" : "time_ago",
      //unix Epoch
      html : moment.unix(article_data.created).fromNow()
    });
  authored.append(time_ago);

  var views = $("<li>",
    {
      "class" : "views",
      html : article_data.score +' views'
    });
  authored.append(views);

  var paragraph = $("<p>",
    {
      "class" : "description",
      html : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, facere veritatis, at tempora ex ratione sapiente? Ducimus ipsa repudiandae, molestias perferendis consequuntur nisi sed atque. Velit modi minima tenetur culpa."
    });
  content_container.append(paragraph);
  // finally, return the box
  // now added data to your document
  return content_container;
}