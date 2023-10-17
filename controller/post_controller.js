 function index(req,res) {
    const posts = "posts all post";
    res.send(posts);
}
function post(req,res) {
    const posts = "new post";
    res.send(posts);
}

export {index,post };