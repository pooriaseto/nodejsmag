var express = require("express");
var router = express.Router();

const homeController = require("../controllers/HomeController");
const BlogController = require("../controllers/BlogController");

router.get("/page/:pageNumber", homeController.indexPagination);
router.get("/", homeController.index);

router.get("/contact-us", function (req, res, next) {
  res.render("contactUs", { title: "contactUs" });
});

router.get("/about-us", function (req, res, next) {
  res.render("aboutUs", { title: "aboutUs" });
});

router.get(
  "/:mainCategorySlug/:subCategorySlug/page/:pageNumber",
  BlogController.subCategoryPagination
);
router.get(
  "/:mainCategorySlug/page/:pageNumber",
  BlogController.mainCategoryPagination
);
router.get("/:mainCategory/:subCategory/:slug", BlogController.singlePost);
router.get("/:mainCategorySlug/:subCategorySlug", BlogController.subCategory);
router.get("/:mainCategorySlug", BlogController.mainCategory);



router.all("*", (req, res, next) => {
  res.render("notFound", { title: "متاسفانه صفحه مورد نظر یافت نشد." });
});

module.exports = router;
