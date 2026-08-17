export default function (eleventyConfig) {
  // L'interface d'administration est copiee telle quelle, sans etre transformee
  eleventyConfig.ignores.add("src/admin/**");
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });

  // Les images deposees par le client depuis le CMS
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });

  return {
    dir: {
      input: "src",
      output: "_site",
      data: "_data",
    },
  };
}
