# lakshmichekkapalli.github.io

Source for my personal portfolio site, hosted on GitHub Pages:
**https://lakshmichekkapalli.github.io**

Plain HTML/CSS/JS — no build step, no framework, no external dependencies.
Light/dark theme (respects system preference, with a manual toggle persisted
in `localStorage`), responsive layout, and a projects section linking out to
four data engineering pipeline projects:

- [batch-etl-pipeline](https://github.com/lakshmichekkapalli/batch-etl-pipeline)
- [dbt-taxi-transformation](https://github.com/lakshmichekkapalli/dbt-taxi-transformation)
- [streaming-pipeline](https://github.com/lakshmichekkapalli/streaming-pipeline)
- [ml-de-crossover](https://github.com/lakshmichekkapalli/ml-de-crossover)

## Local preview

```bash
python -m http.server 8123
```

then open http://localhost:8123.

## Structure

```
index.html      # all page content
style.css       # design system (CSS custom properties) + layout
script.js       # theme toggle, mobile nav, scroll-reveal
```
