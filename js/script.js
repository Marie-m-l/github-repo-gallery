//div where profile info will appear
const overview = document.querySelector(".overview");
const username = "Marie-m-l";
//ul where the repos from gitHub display
const repoLs = document.querySelector(".repo-list");
//selects section w/ repos class
const selectReposClass = document.querySelector(".repos");
//selects section w/ repo-data for individual repo data
const selectRepoDataClass = document.querySelector(".repo-data");
//selects the button to return to repo gallery
const backToGalleryButton = document.querySelector(".view-repos");
//selects the input w/ the search by name placeholder
const filterInput = document.querySelector(".filter-repos");

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

//display each repo of repoLs
const displayRepoInfo = function (repos) {
    for (let repo of repos) {
        const repoItem = document.createElement ("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;

        repoLs.append(repoItem);
        //show filterInput
        filterInput.classList.remove("hide");
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
    //when one repo is clicked
    const fetchOneRepo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchOneRepo.json();
    console.log(repoInfo);
    //to get the language data
    const fetchLanguage = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguage.json();
    console.log(languageData);
    //list of languages and loop through
    //array
    const languages = [];
    //loop through languages info & + languages to the array
    for (const language in languageData) {
        languages.push(language);
        console.log(languages);
    }
    //call displaySpecificRepoInfo
    displaySpecificRepoInfo(repoInfo, languages);
};

//display specific repo info
const displaySpecificRepoInfo = function (repoInfo , languages) {
    selectRepoDataClass.innerHTML = "";
    selectRepoDataClass.classList.remove("hide");
    selectReposClass.classList.add("hide");
    const div = document.createElement("div");
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(" , ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;

    selectRepoDataClass.append(div);

    backToGalleryButton.classList.remove("hide");
};

//click event to back to repo gallery button
backToGalleryButton.addEventListener("click", function () {
    //hide single repo data 4 repoLs display
    selectRepoDataClass.classList.add("hide");
    selectReposClass.classList.remove("hide");
    backToGalleryButton.classList.add("hide");
});

//dynamic search /  input event for repo search
filterInput.addEventListener("input", function (e) {
    //capture value of search txt
    const searchText =  e.target.value;
    // console.log(e); *test*
    const repos = document.querySelectorAll(".repo");
    //convert string to lowercase
    const searchLowerCaseValue = searchText.toLowerCase();

    //loop through ea repo w/i repos element
    for (const repo of repos) {
        const lowerCaseValueInput = repo.innerText.toLowerCase();
        if (lowerCaseValueInput.includes(searchLowerCaseValue)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
        // console.log(e); *test*
    };
});