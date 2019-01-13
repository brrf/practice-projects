let blogPosts = [];

blogPosts.push( {title: 'blog post 1', content: 'blog post 1 has lots and lots of content'} );

function createNewPost () {
	return new Promise( (resolve) => {

		let postTitle = prompt("What is the title of your post?");
		let postContent = prompt("What is the content of your post?");

		blogPosts.push( {title: postTitle, content: postContent} );
		
		render();
	});
}


function render () {

	let container = document.querySelector('.blog-posts-container')
	container.innerHTML = '';

	for (let post in blogPosts) {
		let div = document.createElement('DIV');
		let postBox = div.classList.add('blog-post')
		let postTitle = div.classList.add('blog-post-title');

		
		container.appendChild(postBox);
		postBox.appendChild(postTitle);


		elem.appendChild()
		
		console.log(blogPosts[post].title)
	};
}

