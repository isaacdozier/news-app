var url = 'http://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=fe792c74e363488a934bfbb429d948fd';

var url_movie = "http://www.omdbapi.com/?apikey=f9b5906b&t=joe+dirt"

var getJSON = function(url, callback) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    
    xhr.onload = function() {
    
        var status = xhr.status;
        
        if (status == 200) {
            callback(null, xhr.response);
        } else {
            callback(status);
        }
    };
    
    xhr.send();
};

getJSON(url,  function(err, data) {
    
    if (err != null) {
        console.error(err);
    } else {
        
       console.log(data)
       for(var i = 0; i < data.articles.length; i++){
       	//<h1 id="content_title" ></h1>
        //<p id="content_desc" ></p>
        //<a id="content_url" href=""></a>
        //<p id="content_content"></p>

        //  1) identifier -required
        //  2) parent element -required
        //  3) element to create -required
        //  4) data for element innerHTML -required
        buildArticlePreview(i, "content", "h1", `${data.articles[i].title}`)
        buildArticlePreview(i, "content", "h3",  `${data.articles[i].description}`)
        buildArticlePreview(i, "content", "p",  cleanDesc(`${data.articles[i].content}`))

        buildArticlePreview(i, "content", "a",  "Read More at " + `${data.articles[i].source.name}`)
        document.getElementById('a_' + i).href      += `${data.articles[i].url}`

        document.getElementById("content").appendChild(document.createElement("hr"));
       }
    }
});


var buildArticlePreview = function(num,loc,type,data){
	if(data !== 'null'){
		var header = document.createElement(type)
        	header.setAttribute("id", type + '_' + num)
	    	header.appendChild(document.createTextNode(type));
	      document.getElementById(loc).appendChild(header);
       	  document.getElementById(type + '_' + num).innerHTML = data
       }
}

var cleanDesc =function(data){
	var tmp = data.split("[")[0]
	if(tmp){
		return tmp
	}else{
		return data
	}
}