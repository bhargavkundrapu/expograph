/**
 * A4 purchase receipt PDF (matches email line items; attached to Resend message).
 */
const PDFDocument = require("pdfkit");

const LEFT = 48;
const LINE = 18;

/**
 * @param {object} ctx from getPurchaseInvoiceContext()
 * @returns {Promise<Buffer>}
 */
function buildPurchaseInvoicePdfBuffer(ctx) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margin: 48,
      info: {
        Title: `Invoice ${ctx.invoiceNo}`,
        Author: "ExpoGraph Academy",
        Subject: "Payment receipt",
      },
    });
    const chunks = [];
    doc.on("data", (d) => chunks.push(d));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const pageW = doc.page.width;
    const right = pageW - LEFT;
    const labelW = pageW - LEFT - 200;

    function moneyLine(label, value) {
      const top = doc.y;
      doc.font("Helvetica").fontSize(10).fillColor("#0f172a").text(label, LEFT, top, { width: labelW });
      doc.font("Helvetica-Bold").text(value, pageW - 200, top, { width: 152, align: "right" });
      doc.y = top + LINE;
      doc.x = LEFT;
    }

    doc.fillColor("#1e1b4b").fontSize(20).font("Helvetica-Bold").text("ExpoGraph Academy", { align: "center" });
    doc.moveDown(0.2);
    doc.fillColor("#64748b").fontSize(10).font("Helvetica").text("Tax invoice / Payment receipt", { align: "center" });
    doc.moveDown(1.2);

    doc.fillColor("#0f172a").fontSize(11).font("Helvetica-Bold").text(`Invoice no. ${ctx.invoiceNo}`);
    doc.font("Helvetica").fillColor("#475569").fontSize(10).text(`Date: ${ctx.paidAtDisplay}`);
    doc.moveDown(1);

    doc.fillColor("#0f172a").font("Helvetica-Bold").fontSize(11).text("Bill to");
    doc.moveDown(0.25);
    doc.font("Helvetica").fillColor("#334155").fontSize(10);
    doc.text(ctx.customerName || "Customer");
    doc.text(ctx.customerEmail);
    if (ctx.customerPhone) doc.text(`Phone: ${ctx.customerPhone}`);
    doc.moveDown(1);

    doc.strokeColor("#cbd5e1").lineWidth(0.5).moveTo(LEFT, doc.y).lineTo(right, doc.y).stroke();
    doc.moveDown(0.4);
    doc.fillColor("#64748b").font("Helvetica-Bold").fontSize(9);
    const hdrTop = doc.y;
    doc.text("Description", LEFT, hdrTop, { width: labelW });
    doc.text("Amount (INR)", pageW - 200, hdrTop, { width: 152, align: "right" });
    doc.y = hdrTop + LINE;
    doc.x = LEFT;
    doc.strokeColor("#cbd5e1").moveTo(LEFT, doc.y).lineTo(right, doc.y).stroke();
    doc.moveDown(0.35);

    moneyLine(`${ctx.itemLabel} (${ctx.itemTypeLabel})`, ctx.baseFormatted);
    moneyLine("Platform & payment processing", ctx.feeFormatted);
    doc.strokeColor("#cbd5e1").moveTo(LEFT, doc.y).lineTo(right, doc.y).stroke();
    doc.moveDown(0.35);
    doc.font("Helvetica-Bold").fontSize(10).fillColor("#1e1b4b");
    const totTop = doc.y;
    doc.text("Total paid", LEFT, totTop, { width: labelW });
    doc.fontSize(11).text(ctx.totalFormatted, pageW - 200, totTop, { width: 152, align: "right" });
    doc.y = totTop + LINE + 4;
    doc.x = LEFT;
    doc.strokeColor("#cbd5e1").moveTo(LEFT, doc.y).lineTo(right, doc.y).stroke();
    doc.moveDown(0.8);

    doc.fillColor("#64748b").font("Helvetica").fontSize(9);
    doc.text(`Razorpay order ID: ${ctx.razorpayOrderId}`);
    doc.text(`Razorpay payment ID: ${ctx.razorpayPaymentId}`);
    doc.text(`Internal order: ${ctx.orderId}`);
    doc.text(`Internal payment: ${ctx.paymentId}`);
    doc.moveDown(1);

    if (ctx.sellerLegalName || ctx.sellerAddress || ctx.sellerGstin) {
      doc.fillColor("#0f172a").font("Helvetica-Bold").fontSize(10).text("Seller");
      doc.moveDown(0.25);
      doc.font("Helvetica").fillColor("#475569").fontSize(9);
      if (ctx.sellerLegalName) doc.text(ctx.sellerLegalName);
      if (ctx.sellerAddress) doc.text(ctx.sellerAddress, { width: pageW - 2 * LEFT });
      if (ctx.sellerGstin) doc.text(`GSTIN: ${ctx.sellerGstin}`);
      doc.moveDown(1);
    }

    const lineY = doc.page.height - 72;
    doc.strokeColor("#e2e8f0").lineWidth(0.5).moveTo(LEFT, lineY).lineTo(right, lineY).stroke();
    doc.fillColor("#94a3b8").fontSize(8).font("Helvetica");
    doc.text("Computer-generated invoice for your online purchase.", LEFT, lineY + 8, {
      width: pageW - 2 * LEFT,
      align: "center",
    });
    if (ctx.supportEmail) {
      doc.text(`Support: ${ctx.supportEmail}`, LEFT, lineY + 22, { width: pageW - 2 * LEFT, align: "center" });
    }

    doc.end();
  });
}

module.exports = { buildPurchaseInvoicePdfBuffer };
