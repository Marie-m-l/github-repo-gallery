//div where profile info will appear
const overview = document.querySelector(".overview");
const username = "Marie-m-l";

//fetch API json data
const getUserInfo = async function () {
    const userInfo = await fetch(
        `https://api.github.com/users/${username}`
    );
    const data = await userInfo.json();
    console.log(data);
    displayFetchedData(data);
};
getUserInfo();

//fetch & display user info
const displayFetchedData = function (data) {
    let div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
        <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${data.name}<p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>`;
    overview.append(div);
};