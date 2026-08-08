// =========================================
// DYNAMIC CUSTOMER DATA
// =========================================

const customers = [

    {
        id: 1,
        name: "Alfreds Futterkiste",
        contact: "Maria Anders",
        address: "Obere Str. 57",
        city: "Berlin",
        postal: "12209",
        country: "Germany"
    },

    {
        id: 2,
        name: "Ana Trujillo Emparedados y Helados",
        contact: "Ana Trujillo",
        address: "Avda. de la Constitución 2222",
        city: "México D.F.",
        postal: "05021",
        country: "Mexico"
    },

    {
        id: 3,
        name: "Antonio Moreno Taquería",
        contact: "Antonio Moreno",
        address: "Mataderos 2312",
        city: "México D.F.",
        postal: "05023",
        country: "Mexico"
    },

    {
        id: 4,
        name: "Around the Horn",
        contact: "Thomas Hardy",
        address: "120 Hanover Sq.",
        city: "London",
        postal: "WA1 1DP",
        country: "UK"
    },

    {
        id: 5,
        name: "Berglunds snabbköp",
        contact: "Christina Berglund",
        address: "Berguvsvägen 8",
        city: "Luleå",
        postal: "S-958 22",
        country: "Sweden"
    },

    {
        id: 6,
        name: "Blauer See Delikatessen",
        contact: "Hanna Moos",
        address: "Forsterstr. 57",
        city: "Mannheim",
        postal: "68306",
        country: "Germany"
    },

    {
        id: 7,
        name: "Bon app'",
        contact: "Laurence Lebihan",
        address: "12, rue des Bouchers",
        city: "Marseille",
        postal: "13008",
        country: "France"
    },

    {
        id: 8,
        name: "Bottom-Dollar Markets",
        contact: "Elizabeth Lincoln",
        address: "23 Tsawassen Blvd.",
        city: "Tsawassen",
        postal: "T2F 8M4",
        country: "Canada"
    },

    {
        id: 9,
        name: "Cactus Comidas para llevar",
        contact: "Patricio Simpson",
        address: "Cerrito 333",
        city: "Buenos Aires",
        postal: "1010",
        country: "Argentina"
    },

    {
        id: 10,
        name: "Centro comercial Moctezuma",
        contact: "Francisco Chang",
        address: "Sierras de Granada 9993",
        city: "México D.F.",
        postal: "05022",
        country: "Mexico"
    }

];



// =========================================
// PAGE ELEMENTS
// =========================================

const buttons =
    document.querySelectorAll(".worksheet-btn");

const content =
    document.getElementById("worksheet-content");

const currentWorksheet =
    document.getElementById("currentWorksheet");



// =========================================
// LOAD WORKSHEET USING AJAX
// =========================================

function loadWorksheet(page, title) {

    content.innerHTML = `

        <div class="loading">

            <div class="spinner"></div>

            <p>
                Loading ${title}...
            </p>

        </div>

    `;


    fetch(page)

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    `Unable to load ${title}.`
                );

            }

            return response.text();

        })

        .then(html => {

            content.innerHTML = html;

            currentWorksheet.textContent = title;


            // Load dynamic customer records
            // when Worksheet 1.2 is selected.

            if (page === "worksheet1-2.html") {

                loadCustomers();

            }

        })

        .catch(error => {

            console.error(error);

            content.innerHTML = `

                <div class="placeholder-page">

                    <div class="placeholder-icon">
                        !
                    </div>

                    <h2>
                        Unable to load worksheet
                    </h2>

                    <p>
                        ${error.message}
                    </p>

                </div>

            `;

        });

}



// =========================================
// LOAD CUSTOMER TABLE
// =========================================

function loadCustomers() {

    const table =
        document.getElementById("customer-table");


    if (!table) {

        console.error(
            "Customer table was not found."
        );

        return;

    }


    table.innerHTML = `

        <tr>

            <td
                colspan="8"
                class="table-loading"
            >

                Loading customer records...

            </td>

        </tr>

    `;


    // Small delay to demonstrate
    // asynchronous loading.

    setTimeout(() => {

        let rows = "";


        customers.forEach(customer => {

            rows += `

                <tr>

                    <td>
                        ${customer.id}
                    </td>

                    <td>
                        ${customer.name}
                    </td>

                    <td>
                        ${customer.contact}
                    </td>

                    <td>
                        ${customer.address}
                    </td>

                    <td>
                        ${customer.city}
                    </td>

                    <td>
                        ${customer.postal}
                    </td>

                    <td>
                        ${customer.country}
                    </td>

                    <td>

                        <a
                            href="#"
                            class="edit-profile"
                            onclick="editCustomer(${customer.id}); return false;"
                        >
                            Edit
                        </a>

                        <a
                            href="#"
                            class="delete-profile"
                            onclick="deleteCustomer(${customer.id}); return false;"
                        >
                            Delete
                        </a>

                    </td>

                </tr>

            `;

        });


        table.innerHTML = rows;


    }, 500);

}



// =========================================
// EDIT CUSTOMER
// =========================================

function editCustomer(id) {

    const customer =
        customers.find(
            item => item.id === id
        );


    if (!customer) {
        return;
    }


    alert(
        `Edit Customer\n\n` +
        `ID: ${customer.id}\n` +
        `Name: ${customer.name}\n` +
        `Contact: ${customer.contact}`
    );

}



// =========================================
// DELETE CUSTOMER
// =========================================

function deleteCustomer(id) {

    const index =
        customers.findIndex(
            item => item.id === id
        );


    if (index === -1) {
        return;
    }


    const customer =
        customers[index];


    const confirmed =
        confirm(
            `Delete ${customer.name}?`
        );


    if (!confirmed) {
        return;
    }


    customers.splice(index, 1);

    loadCustomers();

}



// =========================================
// SIDEBAR NAVIGATION
// =========================================

buttons.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            buttons.forEach(btn => {

                btn.classList.remove("active");

            });


            this.classList.add("active");


            const page =
                this.dataset.page;

            const title =
                this.dataset.title;


            loadWorksheet(
                page,
                title
            );

        }
    );

});



// =========================================
// LOAD FIRST WORKSHEET
// =========================================

loadWorksheet(
    "worksheet1-1.html",
    "Worksheet 1.1"
);