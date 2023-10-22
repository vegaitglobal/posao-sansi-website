export function mapStringToLocalDateString(dateString: string): string {
    return new Date(Date.parse(dateString)).toLocaleDateString("de");
}

export function isPublicFile(pathname: string): boolean {
    const publicFolderNames = [
        "files",
        "fonts",
        "images",
    ];
    return !!publicFolderNames.find(folderName => {
        return pathname.startsWith(`/${ folderName }/`);
    });
}
