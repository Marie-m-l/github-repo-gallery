//div where profile info will appear
const overview = document.querySelector(".overview");
const username = "Marie-m-l";
//ul where the repos from gitHub display
const repoLs = document.querySelector(".repo-list");
//selects section w/ repos class
const selectReposClass = document.querySelector(".repos");
//selects section w/ repo-data for individual repo data
const selectRepoDataClass = document.querySelector(".repo-data");

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
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>
    `;
    overview.append(div);

    getRepoLs();
};

// async to fetch repos API
const getRepoLs = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    console.log(fetchRepos);

    displayRepoInfo(repoData);
};

// getRepoLs(); *test*

//display each repo
const displayRepoInfo = function (repos) {
    for (let repo of repos) {
        const repoItem = document.createElement ("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;

        repoLs.append(repoItem);
    }
};

//click event for ul w/ class repo-list
repoLs.addEventListener ("click" , function (e) {
    // console.log(e); *test*
    if (e. target.matches("h3")) {
        const repoName = e.target.innerText;
        specificRepoInfo(repoName); 
    }
});

//async to get specific repo info
const specificRepoInfo = async function (repoName) {
    const fetchOneRepo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchOneRepo.json();
    console.log(repoInfo);
    const fetchLanguage = await fetch(``)
};