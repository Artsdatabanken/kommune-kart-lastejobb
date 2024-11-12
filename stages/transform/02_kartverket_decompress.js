// const { archive } = require("@artsdatabanken/lastejobb");
const unzipper = require("unzipper");
async function unzip(archive) {
    const directory = await unzipper.Open.file("./temp/" + archive);
    await directory.extract({ path: './temp' })
}

unzip("kommune_geometri.zip");
unzip("fylke_geometri.zip");
