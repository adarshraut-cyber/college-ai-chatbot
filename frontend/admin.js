const token = localStorage.getItem("token");

if(!token){

    alert("Please login first.");

    window.location.href="login.html";

}


const API = "http://localhost:5000/api/faqs";
let allFAQs = [];
// Load all FAQs
async function loadFAQs() {

    const response = await fetch(API);
    allFAQs = await response.json();
   displayFAQs(allFAQs);
}
      
function displayFAQs(faqs){

    let html = "";

    faqs.forEach(faq => {

        html += `
        <div class="faq">

            <h3>${faq.question}</h3>

            <p>${faq.answer}</p>

            <button onclick="editFAQ('${faq._id}','${faq.question}','${faq.answer}')">
                Edit
            </button>

            <button onclick="deleteFAQ('${faq._id}')">
                Delete
            </button>

        </div>
        `;

    });

    document.getElementById("faqList").innerHTML = html;

}
// Add FAQ
async function addFAQ() {

    const question = document.getElementById("question").value;

    const answer = document.getElementById("answer").value;

    if(question === "" || answer === ""){

        alert("Please fill all fields");

        return;
    }

    await fetch(API, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            question,
            answer

        })

    });

    document.getElementById("question").value = "";

    document.getElementById("answer").value = "";
       loadFAQs();
}

    //Delete FAQ
    async function deleteFAQ(id){

    const confirmDelete = confirm("Delete this FAQ?");

    if(!confirmDelete){

        return;

    }

    await fetch(API + "/" + id, {

        method:"DELETE"

    });

    loadFAQs();

}

  //editFAQ
    async function editFAQ(id, oldQuestion, oldAnswer){

    const question = prompt("Edit Question", oldQuestion);

    if(question === null) return;

    const answer = prompt("Edit Answer", oldAnswer);

    if(answer === null) return;

    await fetch(API + "/" + id, {

        method: "PUT",

        headers: {
            "Content-Type":"application/json"
        },

        body: JSON.stringify({

            question,
            answer

        })

    });

    loadFAQs();

}

//search FAQ
function searchFAQ(){

    const keyword = document
        .getElementById("search")
        .value
        .toLowerCase();

    const filtered = allFAQs.filter(faq =>

        faq.question.toLowerCase().includes(keyword) ||

        faq.answer.toLowerCase().includes(keyword)

    );

    displayFAQs(filtered);

}

function logout(){

    localStorage.removeItem("token");

    window.location.href="login.html";

}

loadFAQs();