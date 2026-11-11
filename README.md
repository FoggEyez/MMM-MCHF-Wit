# MMM-MCHF-Wit

Original offline humor with custom phrases and no API key.

**MCHF means Mischief.** Part of [Mirror Mischief](https://github.com/FoggEyez/Mirror-Mischief). Install and configure manually, or use the optional companion.

![MMM-MCHF-Wit rendered example](docs/screenshot.png)

Screenshot uses the actual module renderer in an isolated preview. Network/health/economy readings are labelled synthetic demonstration data, not live readings.

## Install

Requires a working MagicMirror² installation, Node.js 22 or newer, and a current browser. Development baseline: MagicMirror² 2.38.0 API. Physical-device compatibility of this newly packaged version remains to be verified; see VALIDATION.md.

```sh
cd ~/MagicMirror/modules
git clone https://github.com/FoggEyez/MMM-MCHF-Wit.git
```

No npm runtime dependencies or install scripts. No extra services are required.

Add this to the modules array in config/config.js, then restart MagicMirror²:

```js
{
  "module": "MMM-MCHF-Wit",
  "position": "middle_center",
  "animateIn": "flipInX",
  "config": {
    "transitionStyle": "fade",
    "transitionMs": 900
  }
}
```

## Customize

Choose `humorStyle`: mixed, dry, absurd or nerdy. Use `customPhrases` for your own messages and `includeBuiltIn: false` for custom-only mode. An empty custom-only collection safely falls back to the bundled original phrases. `updateSeconds` is clamped to 30–3600; `maxCharacters` to 60–180. The default transitionStyle is fade: only the phrase fades out and in over transitionMs (200–2400 milliseconds, default 900). Use none for instant changes. Reduced-motion preferences skip the fade. The module element stays in place.

All supported settings are visible as literal defaults for generated settings editors.

| Setting | Default | Type |
| --- | --- | --- |
| humorStyle | `"mixed"` | string |
| updateSeconds | `300` | number |
| panelWidth | `620` | number |
| textSize | `"normal"` | string |
| showLabel | `true` | boolean |
| contextAware | `true` | boolean |
| includeBuiltIn | `true` | boolean |
| maxCharacters | `120` | number |
| customPhrases | `[]` | array |
| transitionStyle | `"fade"` | string |
| transitionMs | `900` | number |

## Mirror Mischief companion

Part of [Mirror Mischief](https://github.com/FoggEyez/Mirror-Mischief), a companion designed to make module installation, settings and layout easier. See [MIRROR-MISCHIEF.md](MIRROR-MISCHIEF.md) for setup and availability.

In Mirror Mischief, choose Install from a link, paste this repository URL, then open Module settings. Set your preferences and position, save and run Check setup. The repository folder, JavaScript entry and Module.register name match exactly. companion.json describes supported placement and dependencies; the current companion reads defaults from JavaScript, not this manifest. One instance per mirror is supported in this release; helpers share one configuration per module. For renamed legacy modules, install this version turned off first and disable the legacy counterpart before enabling it. All public modules now use MMM-MCHF names, including Luna and Wit. GitHub redirects do not rename installed folders or config entries. Keep a configuration backup, install the newly named folder, transfer supported settings and disable the earlier counterpart before enabling its replacement. No automatic config migration or removal occurs. Ordinary MagicMirror² configuration works without the companion.

## APIs, privacy and cost

None. Offline; no account, API key, subscription or network requests.

No telemetry or analytics is added by Mischief. Keep private configuration, tokens and collector snapshots outside this repository.

## Update or remove

Review CHANGELOG.md, back up your private config and local customizations, then run git pull --ff-only inside this module folder and restart MagicMirror². To remove, disable/remove its config entry and restart; retain the folder for rollback or uninstall it using your companion. Never overwrite private configuration from an example.

## Development and support

Run npm ci and npm test. See CONTRIBUTING.md and VALIDATION.md. Report reproducible issues through this repository's Issues tab; remove secrets and private addresses.

## Credits and license

The bundled phrase collection and generator are original Mischief work.

Original Mischief code: MIT, Copyright 2026 FoggEyez. Third-party licenses and data credits remain applicable; see THIRD_PARTY_NOTICES.md.

## Help and troubleshooting

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for common states and setup checks. [Open an issue](https://github.com/FoggEyez/MMM-MCHF-Wit/issues) with a minimal configuration that has secrets removed.
