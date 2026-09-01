# Crowdfunding Using Blockchain

A project report and source-code appendix for a crowdfunding platform that applies blockchain concepts to improve security, transparency, and trust in fundraising.

## Project Overview

Traditional crowdfunding platforms can face challenges involving security, transparency, trust, and efficiency. This project proposes integrating blockchain technology into the crowdfunding process, using decentralization, tamper-resistant records, and smart-contract-based automation to improve the fundraising workflow.

The project describes three user types—admins, fundraisers, and backers—and modules for blockchain integration, smart-contract automation, cryptocurrency payments, security/transparency, and the user interface.

## Technology Mentioned in the Report

- Frontend: React / HTML / CSS / JavaScript
- Backend: Node.js and Express
- Database: MongoDB (used by the supplied source-code appendix)
- Blockchain: Ethereum (described in the project report)
- Smart contracts: Solidity (described in the project report)
- Wallet / cryptocurrency: described in the project report

## Repository Contents

```text
Crowdfunding-Using-Blockchain/
├── README.md
├── .gitignore
├── .env.example
├── Documentation/
│   └── Crowdfunding-Using-Blockchain-Report.pdf
├── source-code/
│   ├── frontend/
│   │   ├── App.jsx
│   │   ├── Main.jsx
│   │   ├── index.css
│   │   ├── App-styles.css
│   │   └── components/
│   │       ├── Login.jsx
│   │       ├── Register.jsx
│   │       ├── Home.jsx
│   │       └── ViewProject.jsx
│   └── backend/
│       └── server.js
└── screenshots/
    ├── output-2.png
    └── output-3.png
```

## Features Described

- User registration and login
- Crowdfunding project creation
- Project browsing and details
- Donation/funding workflow
- Funding-progress tracking
- Donation confirmation
- Project statistics
- MongoDB-backed application data in the supplied implementation appendix
- Blockchain and smart-contract concepts described as the proposed architecture

## Important Note About the Supplied Report

This repository is a GitHub-ready documentation/source-code representation of the supplied final project report. The report describes Ethereum and Solidity as part of the proposed blockchain solution, while the source-code appendix supplied in the report contains React/Node.js/MongoDB implementation excerpts. No Solidity smart-contract source is included in the supplied report appendix, and several imported React components/routes are referenced but their source is not included in the appendix.

Therefore, the files in `source-code/` should be treated as the source excerpts reproduced from the report, not as a claim that this repository is a complete buildable application.

## Documentation

The `Documentation/` folder contains a public-project version of the technical portion of the final report, with the college submission/front-matter pages omitted.

## Screenshots

The screenshots folder contains selected application outputs reproduced from the report. Personally identifying login information and database-management screenshots from the original report have intentionally not been included in this public version.

## Project Objective

The objective stated in the report is to demonstrate how blockchain can improve the security, transparency, accountability, and efficiency of crowdfunding while using smart contracts to automate predefined agreements between fundraisers and backers.

## Future Enhancements

The report identifies future enhancements including fiat payment integration, a mobile application, enhanced KYC/user verification, and support for multiple blockchains.

## Academic Project

**Project Title:** Crowdfunding Using Blockchain

**Project Type:** Application

This repository is prepared from the final project material supplied for the project.
