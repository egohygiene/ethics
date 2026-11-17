import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const heading = "AI is not one ethical question.";
async function load(page) {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: heading })).toBeVisible();
}
async function noOverflow(page) {
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
}

test("all sections, source-backed charts, exact tables, and evidence gaps work", async ({
  page,
}) => {
  await load(page);
  await expect(page.locator(".sidebar nav a")).toHaveCount(7);
  await expect(page.locator(".evidence-chart")).toHaveCount(3);
  for (const id of [
    "overview",
    "dashboard",
    "perspectives",
    "research",
    "resources",
    "methodology",
    "author",
  ])
    await expect(page.locator(`#${id}`)).toBeAttached();
  await page.locator("#chart-global summary").click();
  await expect(page.locator("#chart-global table")).toContainText("415");
  await expect(page.locator("#chart-global table")).toContainText("945");
  await expect(page.locator("#chart-global .metadata")).toContainText(
    "Pending independent human review",
  );
  await page.getByLabel("Evidence lens").selectOption("accountability");
  await expect(page.locator(".evidence-chart")).toHaveCount(0);
  await expect(page.locator(".evidence-gap")).toContainText("coverage gap");
  await page.locator(".snapshot").first().click();
  await expect(page.locator(".evidence-chart")).toHaveCount(3);
  await page
    .getByRole("button", { name: "Corporate Accountability", exact: false })
    .first()
    .click();
  await expect(page.locator("#lens-detail")).toContainText(
    "independently verified conduct",
  );
  await noOverflow(page);
});

test("calculator changes the scenario and handles zero accepted outputs", async ({
  page,
}) => {
  await load(page);
  await expect(page.locator(".hypothesis-label")).toContainText(
    "conceptual model, not measured results",
  );
  await page.locator("#intentionalAttempts").fill("8");
  await page.locator("#trialAttempts").fill("1");
  await expect(page.locator(".scenario-result")).toContainText("higher");
  await page
    .getByText("Edit all relative costs & accepted-output counts", {
      exact: true,
    })
    .click();
  await page
    .getByLabel("Accepted intentional outputs", { exact: true })
    .fill("0");
  await expect(page.locator(".scenario-result")).toContainText("Undefined");
  await page.getByRole("button", { name: "Reset assumptions" }).click();
  await expect(page.locator("#intentionalAttempts")).toHaveValue("2");
  await page.getByRole("button", { name: "Pause flow" }).click();
  await expect(
    page.getByRole("button", { name: "Resume flow" }),
  ).toHaveAttribute("aria-pressed", "true");
});

test("all ten perspectives and discovery filters retain usable empty states", async ({
  page,
}) => {
  await load(page);
  const topics = page.locator(".topic-list button");
  await expect(topics).toHaveCount(10);
  for (let i = 0; i < 10; i++) {
    await topics.nth(i).click();
    await expect(page.locator("#perspective-detail")).toContainText(
      "WHAT IT DOES NOT ESTABLISH",
    );
    await expect(
      page.locator(".perspective-sources a").first(),
    ).toHaveAttribute("href", /^https:/);
  }
  await page
    .getByRole("searchbox", { name: "Search research", exact: true })
    .fill("StoreLLM");
  await expect(page.locator(".paper-card")).toHaveCount(1);
  await page
    .getByRole("combobox", { name: "Research topic", exact: true })
    .selectOption("privacy");
  await expect(page.locator("#research .empty-state")).toBeVisible();
  await page
    .getByRole("button", { name: "Clear filters", exact: true })
    .first()
    .click();
  await expect(page.locator(".paper-card")).toHaveCount(3);
  await page.getByRole("button", { name: "Show all 13 publications" }).click();
  await expect(page.locator(".paper-card")).toHaveCount(13);
  await page
    .getByRole("searchbox", { name: "Search resources" })
    .fill("CodeCarbon");
  await expect(page.locator(".resource-card")).toHaveCount(1);
  await page
    .getByRole("searchbox", { name: "Search resources" })
    .fill("no-resource-999");
  await expect(page.locator("#resources .empty-state")).toBeVisible();
});

test("dark and light themes have no detected WCAG A/AA violations with details expanded", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await load(page);
  for (const theme of ["dark", "light"]) {
    if (theme === "light")
      await page.getByRole("button", { name: "Switch to light theme" }).click();
    await page.evaluate(() =>
      document.querySelectorAll("details").forEach((d) => (d.open = true)),
    );
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      result.violations.map((v) => ({
        id: v.id,
        description: v.description,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
    await noOverflow(page);
  }
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("mobile layouts, reduced motion, and topic selection are accessible", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await load(page);
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await noOverflow(page);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator("#perspective-topic").selectOption("topic-labor");
  await expect(page.locator("#perspective-detail")).toContainText(
    "occupational exposure",
  );
  await expect(page.locator(".energy-path").first()).toHaveCSS(
    "animation-name",
    "none",
  );
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(result.violations).toEqual([]);
});

test("keyboard access, hash links, and privacy-preserving runtime remain intact", async ({
  page,
}) => {
  const requests = [];
  page.on("request", (request) => requests.push(request.url()));
  await load(page);
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
  const missing = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links
        .filter(
          (a) => !document.getElementById(a.getAttribute("href").slice(1)),
        )
        .map((a) => a.getAttribute("href")),
    );
  expect(missing).toEqual([]);
  expect(
    requests.filter((u) => !u.startsWith("http://127.0.0.1:4175/")),
  ).toEqual([]);
  await page.goto("/#perspectives");
  await expect(page.locator("#perspectives")).toBeInViewport();
});

test("failed snapshot loading offers a working retry instead of invented data", async ({
  page,
}) => {
  let fail = true;
  await page.route("**/data/v1/observatory.json", (route) =>
    fail ? route.abort() : route.continue(),
  );
  await page.goto("/");
  await expect(page.getByRole("alert")).toContainText(
    "Evidence could not be loaded",
  );
  fail = false;
  await page.getByRole("button", { name: "Retry loading" }).click();
  await expect(page.getByRole("heading", { name: heading })).toBeVisible();
});

test("long explanations start closed and keyboard disclosure preserves access", async ({
  page,
}) => {
  await load(page);
  await expect(page.locator("main details[open]")).toHaveCount(0);
  await expect(page.locator("#chart-global table")).toBeHidden();
  await page.locator("#chart-global summary").focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#chart-global table")).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page.locator("#chart-global table")).toBeHidden();
  const explanation = page.locator(".perspective-folds details").first();
  await explanation.locator("summary").click();
  await expect(explanation.locator(".disclosure-content")).toBeVisible();
  await page.locator(".topic-list button").nth(1).click();
  await expect(page.locator(".perspective-folds details[open]")).toHaveCount(0);
  await expect(page.locator(".hypothesis-label")).toBeVisible();
  await expect(page.locator(".data-review-note")).toContainText(
    "human evidence review is pending",
  );
});

test("topic bars filter the reviewed reading queue and scenario bars follow assumptions", async ({
  page,
}) => {
  await load(page);
  await expect(page.locator(".snapshot-bars")).toHaveCount(3);
  await expect(page.locator(".release-coverage")).toContainText(
    "5 documented estimates",
  );
  const topic = page
    .locator(".topic-coverage button")
    .filter({ hasText: "Privacy & data governance" });
  await topic.click();
  await expect(
    page.getByRole("combobox", { name: "Research topic", exact: true }),
  ).toHaveValue("privacy");
  await expect(page.locator(".paper-card")).toHaveCount(2);
  await topic.click();
  await expect(
    page.getByRole("combobox", { name: "Research topic", exact: true }),
  ).toHaveValue("all");
  await expect(page.locator(".scenario-figure svg")).toHaveAccessibleName(
    "Conceptual workflow comparison",
  );
  await page
    .getByText("Edit all relative costs & accepted-output counts", {
      exact: true,
    })
    .click();
  await page
    .getByLabel("Accepted intentional outputs", { exact: true })
    .fill("0");
  await expect(page.locator(".scenario-figure svg")).toContainText("Undefined");
});
