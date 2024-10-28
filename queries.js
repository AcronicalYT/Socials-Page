const apiURL = "https://api.acronical.uk";
const nameText = document.querySelector('.name-text');
const socialListItem = document.querySelectorAll(".social");

async function fetchAPI() {
    const response = await fetch(apiURL);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    if (!response) throw new Error('No response from API');
    return await response.json();
}

async function renderData(social) {
    const data = await fetchAPI();
    if (!data) throw new Error('No data to render');
    if (!social) throw new Error('No social media to render');
    if (social === "website") {
        nameText.innerHTML = data.uk_url;
        return;
    }
    return nameText.innerHTML = data[`${social}_handle`];
}

for (let i = 0; i < socialListItem.length; i++) {
    socialListItem[i].addEventListener('mouseover', () => {
        renderData(socialListItem[i].id);
    });
}

for (let i = 0; i < socialListItem.length; i++) {
    socialListItem[i].addEventListener('mouseleave', () => {
        fetchAPI().then(data => {
            nameText.innerHTML = data.name;
        });
    });
}

window.onload = () => {
    fetchAPI().then(data => {
        nameText.innerHTML = data.name;
    });
}