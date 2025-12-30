# 🚀 Quick Start Guide - Language Switch

## Testing the Implementation

### 1. **Start the Development Server**

```bash
npm run dev
# or
bun dev
```

### 2. **Apply Database Migration**

Go to your Supabase Dashboard → SQL Editor:

```sql
-- Add English translation columns
ALTER TABLE public.questions
ADD COLUMN question_text_en TEXT,
ADD COLUMN options_en JSONB;
```

Or use the Supabase CLI:
```bash
supabase db push
```

### 3. **Add Sample Bilingual Questions**

In Supabase SQL Editor, run:
```sql
-- Copy and paste content from:
scripts/sample_bilingual_questions.sql
```

This will add 8 sample questions in both French and English.

### 4. **Test the Language Switch**

1. Open the app in your browser
2. You'll see the language switcher (FR | EN) in the top-right
3. Click on EN - everything should switch to English instantly
4. Start the quiz
5. Switch between FR/EN while taking the quiz
6. Verify:
   - ✅ Questions update
   - ✅ Answer choices update
   - ✅ Buttons update
   - ✅ Progress stays the same
   - ✅ No page reload

---

## Important Notes

### ⚠️ Questions Without English

If you have existing questions without English translations:
- They will display in French when EN is selected
- No errors will occur
- Add English translations gradually

### ✅ Adding English to Existing Questions

```sql
UPDATE questions
SET 
  question_text_en = 'Your English question here',
  options = jsonb_set(
    options,
    '{0,text_en}',
    '"English option A"'
  )
WHERE id = 'your-question-id';
```

Or use the admin panel to edit questions.

---

## Expected Behavior

### Landing Page (Hero)
- Badge: "Professional Accounting Assessment"
- Title: "Discover Your Accounting Level in Minutes"
- Features update to English
- Button: "Start the Level Test"

### Quiz
- Progress: "Progress" (instead of "Progression")
- Question format: "Question X of Y" (instead of "sur")
- Difficulty badges: Easy/Medium/Advanced
- Categories translate automatically
- Button: "Next Question" / "Finish Test"

### Lead Form
- Title: "Almost there!"
- Fields: "Full name", "Email address", "Phone number"
- Button: "View My Results"
- Validation errors in English

### Results
- Title: "Congratulations, [Name]!"
- Sections: "Your Score", "Your Level", "Accuracy"
- Level descriptions in English
- Button: "Book a Free Call"

---

## Troubleshooting

### Language switcher not showing?
- Check browser console for errors
- Verify `LanguageProvider` is in `main.tsx`
- Clear cache and reload

### Questions not switching language?
- Verify `question_text_en` exists in database
- Check `text_en` field in options
- Console log the question object to debug

### Styles look wrong?
- Clear browser cache
- Check CSS is compiled (`npm run build`)
- Verify Tailwind classes are valid

---

## Production Checklist

Before deploying:

- [ ] Apply database migration
- [ ] Add English translations to all questions
- [ ] Test language switch on all quiz pages
- [ ] Test on mobile devices
- [ ] Verify no console errors
- [ ] Check performance (should be instant)
- [ ] Test with real user flow
- [ ] Verify analytics tracking (if any)
- [ ] Check SEO meta tags for both languages
- [ ] Test form submissions in both languages

---

## Need Help?

1. Check `LANGUAGE_SUPPORT.md` for detailed documentation
2. See `IMPLEMENTATION_SUMMARY.md` for complete overview
3. Review sample files in `scripts/` folder
4. Check individual component files for examples

---

**That's it! Your bilingual quiz is ready to use.** 🎉

Simply run the app, apply the migration, add questions, and test!
