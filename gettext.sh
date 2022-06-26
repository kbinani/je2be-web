set -ue

function keywords {
  cat $(git ls-files | grep '\.ts') | tr -d '\n' | sed 's/gettext/\ngettext/g' | grep '^gettext(' | sed 's/^gettext([ ]*/gettext(/g' | grep '^gettext("' | sed 's/gettext(\("[^"]*"\).*/\1/g' | sort | uniq
}

(
  echo -n "export type TranslationKey = "
  keywords | while read keyword; do
    echo -n "$keyword | "
  done
) | sed 's/ | $/;/g' > src/front/translation-key.ts
