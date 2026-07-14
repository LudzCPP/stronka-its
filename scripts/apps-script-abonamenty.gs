// Google Apps Script — zapis zakupów abonamentów do arkusza Google Sheets.
//
// INSTALACJA (może być dowolne konto Google — arkusz i tak zostanie
// udostępniony klientowi, a mail z powiadomieniem i tak leci na OWNER_EMAIL poniżej):
// 1. Arkusz Google Sheets, zakładka "Abonamenci", nagłówki w wierszu 1 (kolumny A-J):
//    Imię i nazwisko | Email | Telefon | Plan | Cena | Data zakupu |
//    Data wygaśnięcia | Status | ID transakcji P24 | Session ID
// 2. W arkuszu: Rozszerzenia -> Apps Script. Wklej ten kod, podmień SECRET
//    ponizej na wlasna losowa wartosc (musi byc identyczna jak APPS_SCRIPT_SECRET
//    w Vercelu) - NIE commituj prawdziwej wartosci do repo, to tylko kopia referencyjna.
// 3. Wdróż -> Nowe wdrożenie -> Aplikacja internetowa (Web App):
//    - Wykonaj jako: Ja
//    - Dostęp mają: Każdy (Anyone)
// 4. Skopiowany URL wdrożenia -> APPS_SCRIPT_URL w .env.local i w Vercelu.

const SHEET_NAME = 'Abonamenci'
const SECRET = 'PODMIEN_NA_WLASNY_LOSOWY_SEKRET'
const OWNER_EMAIL = 'tenisstolowy.lodz@gmail.com'

function doPost(e) {
  const payload = JSON.parse(e.postData.contents)

  if (payload.secret !== SECRET) {
    return jsonResponse({ ok: false, error: 'Unauthorized' })
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME)

  if (payload.action === 'create') {
    sheet.appendRow([
      payload.name,
      payload.email,
      payload.phone,
      payload.plan,
      payload.price,
      '',
      '',
      'Oczekuje na płatność',
      '',
      payload.sessionId,
    ])
    return jsonResponse({ ok: true })
  }

  if (payload.action === 'confirm') {
    const data = sheet.getDataRange().getValues()

    for (let i = data.length - 1; i >= 1; i--) {
      if (data[i][9] === payload.sessionId) {
        const rowIndex = i + 1
        const purchaseDate = new Date()
        const expiryDate = new Date()
        expiryDate.setDate(expiryDate.getDate() + 30)

        sheet.getRange(rowIndex, 6).setValue(purchaseDate)
        sheet.getRange(rowIndex, 7).setValue(expiryDate)
        sheet.getRange(rowIndex, 8).setValue('Opłacone')
        sheet.getRange(rowIndex, 9).setValue(payload.orderId)

        MailApp.sendEmail({
          to: OWNER_EMAIL,
          name: 'System Abonamentów ITS Łódź',
          subject: `Nowy zakup abonamentu: ${data[i][3]}`,
          body: [
            `Klient: ${data[i][0]}`,
            `Telefon: ${data[i][2]}`,
            `Email: ${data[i][1]}`,
            `Plan: ${data[i][3]}`,
            `Cena: ${data[i][4]} zł`,
            `Ważny do: ${expiryDate.toLocaleDateString('pl-PL')}`,
            `ID transakcji P24: ${payload.orderId}`,
          ].join('\n'),
        })

        MailApp.sendEmail({
          to: data[i][1],
          name: 'Instytut Tenisa Stołowego Łódź',
          subject: `Potwierdzenie zakupu: ${data[i][3]}`,
          body: [
            `Cześć ${data[i][0]},`,
            '',
            'Dziękujemy za zakup abonamentu w Instytucie Tenisa Stołowego w Łodzi!',
            '',
            'Szczegóły zakupu:',
            `Plan: ${data[i][3]}`,
            `Cena: ${data[i][4]} zł`,
            `Ważny do: ${expiryDate.toLocaleDateString('pl-PL')}`,
            `ID transakcji: ${payload.orderId}`,
            '',
            'Do zobaczenia na sali!',
            'ul. Śnieżna 5 (Wejście A), Łódź',
            '',
            'gramnaits.pl',
          ].join('\n'),
        })

        return jsonResponse({ ok: true })
      }
    }

    return jsonResponse({ ok: false, error: 'Nie znaleziono sesji' })
  }

  return jsonResponse({ ok: false, error: 'Nieznana akcja' })
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON)
}
