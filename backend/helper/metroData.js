// export const metroData = [
    //     {
        //         line: "Line 1",
        //         stations: [
            //             { name: "Versova", distanceFromStart: 0 },
//             { name: "D N Nagar", distanceFromStart: 1.5 },
//             { name: "Azad Nagar", distanceFromStart: 3.0 },
//             { name: "Andheri", distanceFromStart: 5.0 },
//             { name: "Ghatkopar", distanceFromStart: 11.4 },
//         ],
//     },
//     {
//         line: "Line 2A",
//         stations: [
//             { name: "Dahisar East", distanceFromStart: 0 },
//             { name: "Anand Nagar", distanceFromStart: 2.0 },
//             { name: "Borivali West", distanceFromStart: 5.0 },
//         ],
//     },
// ];


export const metroData = {
    "lines": [
        {
            "line": "Line-1",
            "name": "Versova-Andheri-Ghatkopar",
            "stations": ["Versova", "DN Nagar", "Azad Nagar", "Andheri", "Western Express Highway", "Chakala (JB Nagar)", "Marol Naka", "Saki Naka", "Asalpha", "Jagruti Nagar", "Ghatkopar"]
        },
        {
            "line": "Line-2A",
            "name": "Dahisar East-DN Nagar",
            "stations": ["Dahisar East", "Anand Nagar", "Kandarpada", "Kandivali West", "Shimpoli", "Borivali West", "Shivaji Nagar", "Link Road Goregaon West", "DN Nagar"]
        },
        {
            "line": "Line-2B",
            "name": "DN Nagar-Bandra-Mankhurd",
            "stations": ["DN Nagar", "Juhu Circle", "Santacruz West", "Bandra West", "Kalanagar", "Bandra Kurla Complex", "Kurla East", "Chembur", "Mankhurd"]
        },
        {
            "line": "Line-4",
            "name": "Wadala-Kasarvadavali",
            "stations": ["Wadala", "Bhakti Park", "Amar Mahal", "Ghatkopar", "Mulund", "Teen Hath Naka", "Kasarvadavali"]
        },
        {
            "line": "Line-5",
            "name": "Thane-Bhiwandi-Kalyan",
            "stations": ["Thane", "Bhiwandi", "Kalyan"]
        },
        {
            "line": "Line-6",
            "name": "Swami Samarth Nagar-Vikhroli",
            "stations": ["Swami Samarth Nagar", "Jogeshwari", "SEEPZ", "Powai", "Vikhroli"]
        },
        {
            "line": "Line-7",
            "name": "Dahisar East-Gundavali",
            "stations": ["Dahisar East", "Kandarpada", "Borivali East", "Magathane", "Poinsur", "Gundavali"]
        },
        {
            "line": "Line-9 & 7A",
            "name": "Dahisar East-Mira Bhayandar and Andheri East-CSMIA",
            "stations": ["Dahisar East", "Mira Road", "Bhayandar", "Andheri East", "CSMIA"]
        }
    ],
    "features": {
        "viaRoutes": true
    }
}
