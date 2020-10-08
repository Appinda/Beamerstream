import fs from "fs-extra";
import path from "path";

export default async function(context) {
  const itemsToCopy = [
    '/data',
  ]
  console.log("Copying files..");
  for(let filename of itemsToCopy){
    await fs.copy(path.join(context.packager.info.projectDir, filename), path.join(context.appOutDir, filename));
    console.log(` Copied ${filename}`);
  }
}