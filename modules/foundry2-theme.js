import { baseThemeApplications, baseThemePf2eSheets, MODULE_NAME, premiumModuleSelector } from "./consts.js";

// Add .dorako-ui to all always-styled applications (Does not include pf2e sheets)
for (const appName of [...baseThemeApplications]) {
  Hooks.on("render" + appName, (app, html, data) => {
    if (app.constructor.name.startsWith("SWPF")) return; // SWPFCompendiumTOC, SWPFSheet
    const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
    if (theme !== "foundry2-theme") return;
    const excludeString = game.settings.get("pf2e-dorako-ui", "customization.excluded-applications");
    if (excludeString.toLowerCase().includes(appName.toLowerCase())) {
      console.debug(
        `${MODULE_NAME} | render${app.constructor.name} | is included in excluded applications string ${excludeString} => do not add .foundry2`
      );
      return;
    }
    console.debug(`${MODULE_NAME} | baseThemeApplications | render${app.constructor.name} => add .foundry2`);
    html.addClass("foundry2");
  });
}

Hooks.on("renderApplication", (app, html, data) => {
  let html0 = html[0];
  //   if (html0.classList.contains("dialog")) return;
  if (html0.classList.contains("editable")) return;
  if (!html0.classList.contains("window-app")) return;
  const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
  if (theme !== "foundry2-theme") {
    return;
  }
  const fakeDialogPatterns = ["popup", "dialog"];
  for (const fakeDialogPattern of [...fakeDialogPatterns]) {
    if (app.constructor.name.toLowerCase().includes(fakeDialogPattern)) {
      console.debug(
        `${MODULE_NAME} | render${app.constructor.name} | constructor includes '${fakeDialogPattern}' => add .dialog`
      );
      html.addClass("dialog");
    }
  }
  html.addClass("foundry2");
  //   app.options?.classes?.push("foundry2");
  html.find("form button[type='submit']").addClass("bright");
  html.find(".item-controls button[data-action='apply']").addClass("bright");
  html.find("form button[data-action='save']").addClass("bright");
  html.find("nav.sheet-tabs .item").addClass("button");
});

Hooks.on("renderDialog", (app, html, data) => {
  const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
  if (theme !== "foundry2-theme") {
    return;
  }
  console.debug(`${MODULE_NAME} | render${app.constructor.name} | pushing .foundry2 class option`);
  html.addClass("foundry2");
});

Hooks.on("renderItemSheet", (app, html, data) => {
  const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
  if (theme !== "foundry2-theme") {
    return;
  }
  //   app.options?.classes?.push("foundry2");
  html.addClass("foundry2");
  html.find("form > nav a").addClass("button");
});

// Hooks.on("renderSettingsConfig", (app, html, data) => {
//   const theme = game.settings.get("pf2e-dorako-ui", "theme.application-theme");
//   if (theme !== "foundry2-theme") {
//     return;
//   }

//   html.find("form button[type='submit']").addClass("bright");
// });
