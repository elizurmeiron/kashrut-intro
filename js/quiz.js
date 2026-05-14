'use strict';

/* ============================================================
   קישורים בתוכן העניינים
   הופך הופעות "(שקף N)" לקישורים שמדלגים לשקופית המתאימה
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // התוכן עניינים נמצא בשקופית 2 (אינדקס 1)
    const tocSlide = document.querySelectorAll('.slide')[1];
    if (!tocSlide) return;

    // החלפת "(שקף N)" בקישור לחיץ
    let html = tocSlide.innerHTML;
    html = html.replace(/\(שקף (\d+)\)/g, (match, slideNum) =>
        `<span class="slide-link-span" data-slide="${slideNum}">${match}</span>`
    );
    tocSlide.innerHTML = html;

    // חיווט לחיצות
    tocSlide.querySelectorAll('.slide-link-span').forEach(link => {
        const slideNum = parseInt(link.getAttribute('data-slide'), 10);
        link.addEventListener('click', (e) => {
            e.stopPropagation();
            goToSlide(slideNum);
        });
    });
});

/* ============================================================
   חידון - הצגת תשובות וסימון נכון/שגוי
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.question').forEach(question => {
        const answerBox = question.querySelector('.answer-box');
        const options = question.querySelectorAll('.option');
        const showAnswerBtn = question.querySelector('.show-answer-btn');

        if (!answerBox || !options.length) return;

        // חילוץ האות הנכונה (א/ב/ג/ד) מקופסת התשובה
        const correctMatch = answerBox.textContent.match(/[א-ד]/);
        const correctLetter = correctMatch ? correctMatch[0] : '';

        // לחיצה על אופציה
        options.forEach(option => {
            option.addEventListener('click', () => {
                // אם כבר נבחרה תשובה, לא מאפשר שינוי
                if (question.classList.contains('answered')) return;

                const letter = option.dataset.letter || option.textContent.charAt(0);
                question.classList.add('answered');

                if (letter === correctLetter) {
                    option.classList.add('correct');
                } else {
                    option.classList.add('incorrect');
                    // סימון התשובה הנכונה
                    options.forEach(opt => {
                        const optLetter = opt.dataset.letter || opt.textContent.charAt(0);
                        if (optLetter === correctLetter) {
                            opt.classList.add('correct');
                        }
                    });
                }

                // הצגת קופסת ההסבר
                if (answerBox) answerBox.classList.add('visible');
            });
        });

        // כפתור "הצג תשובה" (אם קיים)
        if (showAnswerBtn) {
            showAnswerBtn.addEventListener('click', () => {
                question.classList.add('answered');
                options.forEach(opt => {
                    const optLetter = opt.dataset.letter || opt.textContent.charAt(0);
                    if (optLetter === correctLetter) opt.classList.add('correct');
                });
                if (answerBox) answerBox.classList.add('visible');
            });
        }
    });
});
