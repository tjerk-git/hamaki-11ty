
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("site.css");
  eleventyConfig.addPassthroughCopy("calendar.js");
  eleventyConfig.addPassthroughCopy("appointment.js");
  eleventyConfig.addPassthroughCopy({ "img/favicon": "/" });
}