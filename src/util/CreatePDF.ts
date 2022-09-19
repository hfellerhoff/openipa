import jsPDF from 'jspdf';

import imageData from '../../public/assets/logo_bw';
import { Charis } from '../constants/fonts/CharisSIL-R-normal';
import TrebuchetMSBold from '../constants/fonts/trebuchet-ms-bold';
import TrebuchetMS from '../constants/fonts/trebuchet-ms-normal';
import { Result, Languages } from '../constants/Interfaces';
import IPA from '../constants/IPA';
import { capitalizeFirstLetter } from './StringHelper';

const createPDFFromResult = async (language: Languages, result: Result) => {
  return new Promise<void>((resolve) => {
    const pdf = new jsPDF();
    const footerY = 285;
    const maxY = footerY - 20;
    const maxX = 165;
    const startX = 15;
    const startY = 20;
    const titleBottomMargin = 15;
    const ipaLineSpacing = 5;
    const fullLineSpacing = 15;
    const imageHeight = 13;
    const imageWidth = 10;

    pdf.addFileToVFS('Charis.ttf', Charis);
    pdf.addFont('Charis.ttf', 'Charis', 'normal');

    pdf.addFileToVFS('Trebuchet-MS.ttf', TrebuchetMS);
    pdf.addFont('Trebuchet-MS.ttf', 'Trebuchet-MS', 'normal');

    pdf.addFileToVFS('Trebuchet-MS-Bold.ttf', TrebuchetMSBold);
    pdf.addFont('Trebuchet-MS-Bold.ttf', 'Trebuchet-MS', 'bold');

    pdf.setFontSize(18);
    pdf.setFont('Helvetica', 'bold');
    pdf.text(
      `Open IPA — ${capitalizeFirstLetter(language)} Language Transcription`,
      startX + imageWidth + 3,
      startY
    );

    pdf.addImage(
      imageData,
      'PNG',
      startX,
      startY - imageHeight / 1.5,
      imageWidth,
      imageHeight
    );

    pdf.setFontSize(12);
    pdf.setFont('Trebuchet-MS', 'normal');
    pdf.text(`https://www.openipa.org`, startX, footerY);

    let y = startY + titleBottomMargin;
    let x = startX;

    let newLine = true;
    result.lines.forEach((line) => {
      let liasonLetter = '';
      line.words.forEach((word) => {
        let textWord = '';
        let ipaWord = '';

        word.syllables.forEach((syllable) => {
          if (syllable.text !== '\n') {
            textWord += syllable.text;
            ipaWord += syllable.ipa;
          }
        });

        pdf.setFontSize(14);
        pdf.setFont('Trebuchet-MS', 'bold');
        const textWidth = pdf.getTextWidth(textWord);
        pdf.setFont('Charis', 'normal');
        const ipaWidth = pdf.getTextWidth(ipaWord);

        if (x > maxX) {
          y += fullLineSpacing;
          x = startX;
          newLine = true;
        }

        if (newLine) {
          if (textWord[0] === ' ')
            textWord = textWord.substring(1, textWord.length);
          if (ipaWord[0] === ' ')
            ipaWord = ipaWord.substring(1, ipaWord.length);
        }

        // Add Liason letter to following word and format spaces
        if (liasonLetter !== '') {
          while (ipaWord[0] === ' ') {
            ipaWord = ipaWord.substring(1, ipaWord.length);
          }
          if (textWord[0] === ' ') ipaWord = ' ' + liasonLetter + ipaWord;
          else ipaWord = liasonLetter + ipaWord;
          console.log(textWord, ipaWord);
          liasonLetter = '';
        }

        // Detect Liason
        if (ipaWord.indexOf(IPA.UNDERTIE) >= 0) {
          liasonLetter = ipaWord.charAt(ipaWord.length - 2);
          ipaWord = ipaWord.substring(0, ipaWord.length - 2);
        }

        pdf.setFontSize(14);
        pdf.setFont('Trebuchet-MS', 'bold');
        pdf.text(textWord, x, y);
        pdf.setFont('Charis', 'normal');
        pdf.text(ipaWord, x, y + ipaLineSpacing);

        newLine = false;

        if (textWidth >= ipaWidth) {
          x += textWidth + 2;
        } else {
          x += ipaWidth + 2;
        }
      });
      x = startX;
      y += fullLineSpacing;

      if (y >= maxY) {
        pdf.addPage();
        pdf.setFontSize(12);
        pdf.setFont('Trebuchet-MS', 'normal');
        pdf.text(`https://www.openipa.org`, startX, footerY);
        y = startY;
        x = startX;
      }
    });
    pdf.save('Open-IPA.pdf');
    resolve();
  });
};

export default createPDFFromResult;
