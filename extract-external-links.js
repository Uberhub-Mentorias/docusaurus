const fs = require("fs");
const path = require("path");

function findMarkdownFiles(dir, fileList = []) {
	const files = fs.readdirSync(dir);

	files.forEach(file => {
		const filePath = path.join(dir, file);
		if (fs.statSync(filePath).isDirectory()) {
			findMarkdownFiles(filePath, fileList);
		} else if (file.endsWith(".md") || file.endsWith(".mdx")) {
			fileList.push(filePath);
		}
	});

	return fileList;
}

function isExternalLink(url) {
	// Verifica se é um link externo (começa com http:// ou https://)
	return url.startsWith("http://") || url.startsWith("https://");
}

function extractExternalLinks(filePath) {
	const content = fs.readFileSync(filePath, "utf8");
	const linkRegex = /\[([^\]]+)\]\(([^\)]+)\)/g;
	const links = [];
	let match;

	while ((match = linkRegex.exec(content)) !== null) {
		const url = match[2];
		if (isExternalLink(url)) {
			links.push({
				text: match[1],
				url: url,
				file: filePath,
			});
		}
	}

	return links;
}

const docsDir = "./docs"; // ajuste o caminho se necessário
const markdownFiles = findMarkdownFiles(docsDir);
const externalLinks = [];

markdownFiles.forEach(file => {
	const links = extractExternalLinks(file);
	externalLinks.push(...links);
});

console.log("Total de links externos encontrados:", externalLinks.length);
console.log("\n=== LINKS EXTERNOS ===\n");

externalLinks.forEach(link => {
	console.log(`📄 Arquivo: ${link.file}`);
	console.log(`   Texto: ${link.text}`);
	console.log(`   URL: ${link.url}\n`);
});

// Salvar em JSON
fs.writeFileSync("external-links.json", JSON.stringify(externalLinks, null, 2));
console.log("✅ Links salvos em external-links.json");
