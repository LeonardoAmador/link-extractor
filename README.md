# link-extractor

link-extractor is a Node.js command-line tool that extracts and validates links from Markdown files. It provides functionality to extract links from a Markdown file or directory of Markdown files and optionally validate the status of the links.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/LeonardoAmador/link-extractor.git

2. Navigate to the project directory:

    cd link-extractor

3. Install dependencies:

    npm install

## Usage

### Extract and Display Links

1. To extract and display links from a Markdown file:

    npm run cli <path-to-file>

    Replace <path-to-file> with the relative or absolute path to the Markdown file you want to process.

2. To extract, validate, and display links from a Markdown file:
   
    npm run cli:validate <path-to-file>
    Replace <path-to-file> with the relative or absolute path to the Markdown file you want to process.