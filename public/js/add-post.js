// const submitPost = document.querySelector("#new-post-form");
console.log("This works");

async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const contents = document.querySelector('input[name="content"]').value;

  console.log(title);
  console.log(contents);

  const response = await fetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify({
      title,
      contents,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document.querySelector("#new-post-form").addEventListener("submit", newFormHandler);
