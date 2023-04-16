//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, aliquid eos! Quo dolorum quos praesentium dolores illum ipsam rem tempore! Quaerat, ea suscipit obcaecati nihil facilis est officia iusto esse rem laudantium placeat sit vero doloremque molestias sapiente sint, enim quibusdam optio impedit. Asperiores molestiae obcaecati fuga, quisquam incidunt provident culpa eos iste dolorum voluptatem magnam sunt omnis commodi repudiandae facere ducimus ea accusamus excepturi temporibus delectus labore possimus id. Illo sunt tempora rem quas, quaerat beatae! Eius nobis quo corporis, ut quos pariatur quod voluptas, tempora aut delectus repudiandae qui laudantium iusto exercitationem. Et quos odit sed nihil perspiciatis!";
const aboutContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi distinctio, aliquid dolore, ducimus vero reprehenderit a exercitationem doloribus quasi recusandae autem accusantium sequi debitis repudiandae ex soluta, voluptates necessitatibus quo odio adipisci at numquam voluptas. Ipsum voluptate nostrum dolor corporis esse necessitatibus, consequatur eaque ad, animi exercitationem vel! Possimus, officiis?";
const contactContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi dicta accusamus soluta aliquid reprehenderit consectetur porro alias mollitia temporibus nulla. Itaque recusandae vel ducimus quia rem tenetur possimus reiciendis, aliquam corrupti culpa debitis harum deleniti animi illo odio quaerat ipsa numquam totam ab impedit. Qui, voluptatum quas! Porro et a, incidunt impedit error beatae dignissimos optio tempora veritatis dolores. Sed, praesentium maiores inventore asperiores delectus quisquam, dignissimos explicabo voluptates aliquid totam sapiente odio voluptas officiis illum. Quos esse dignissimos excepturi.";
let posts = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",(req,res)=>{
  res.render('home',{
    startingContent: homeStartingContent, posts: posts
  });
})

app.get("/about",(req,res)=>{
  res.render('about',{
    aboutContent: aboutContent
  });
})

app.get("/contact",(req,res)=>{
  res.render('contact',{
    contactContent: contactContent
  });
})

app.get("/compose",(req,res)=>{
  res.render('compose',{});
})

app.post("/compose",(req,res)=>{
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  }
  posts.push(post);
  res.redirect("/");
})

app.get("/posts/:param",(req,res)=>{
  const requestedTitle = _.lowerCase(req.params.param);
  
  posts.forEach(post => {
    const storedTitle = _.lowerCase(post.title);

    if(requestedTitle === storedTitle){
      res.render('post',{
        title: post.title,
        content:post.content
      });
    }
  });

})

app.listen(3000, function() {
  console.log("Server started on PORT 3000");
});
