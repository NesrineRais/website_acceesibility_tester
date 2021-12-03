// Fetch accessibility issues
const testAccessibility = async (e) => {
    e.preventDefault();


    const url = document.querySelector('#url').value

    //test if input is not empty
    if (url === '') {
        alert("error empty please add url")

    } else {
        setLoding()
        const response = await fetch(`http://localhost:5000/api/test?url=${url}`)
        if (response.status !== 200) {
            setLoding(false)
            alert("something wont wrong")
        } else {
            const { issues } = await response.json()
            addIssuesToDOM(issues)
            setLoding(false)
        }
    }
}
// Add issue to dom
const addIssuesToDOM = (issues) => {
    console.log(issues)
    const issuesOutput = document.querySelector("#issues")
    issuesOutput.innerHTML = ''

    if (issues.length === 0) {
        issuesOutput.innerHTML = '<h4>No Issues Found</h4>'
    } else {
        issues.forEach(issue => {
            console.log(issue)
            const output = `
            <div class="card mb-5">
                <div class="card-body">
                    <h4>${issue.message}</h4>
                    <p class="bg-light p-3 my-3">
                        ${escapeHTML(issue.context)}
                    </p>

                     <p class="bg-secondary text-light p-3 my-3">
                        CODE: ${issue.code}
                    </p>
                </div>
            </div>
            `
            issuesOutput.innerHTML += output
        });

    }

}

// Set Loading states
const setLoding = (isLoading = true) => {
    const loader = document.querySelector('#loader')
    if (isLoading) {
        loader.style.display = 'block'
    } else {
        loader.style.display = 'none'
    }
}
// Escape HTML
function escapeHTML(html) {
    return html
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
}
// Escape html

document.querySelector('#form').addEventListener("submit", testAccessibility)