import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import { useRouter } from "next/router";
import { ApplicationState } from "../store/store";
import { DailyPhotoInfo } from "../lib/dailyphotos/DailyPhotoApi";
import { useSelector } from "react-redux";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});
const PDFView = () => {
  const router = useRouter();
  // console.log("router.query in pdfview:", router.query);
  const originatingPage = router.query.originatedPage;

  const dailyPhoto = useSelector<ApplicationState, DailyPhotoInfo>(
    (state) => state.dailyphotos.photos!
  );

  return (
    <div>
      {originatingPage === "DailyPhotoCard" && dailyPhoto !== null ? (
        <>
          <PDFViewer width="1024" height="768">
            <Document>
              <Page size="A6" style={styles.page}>
                <View style={styles.section}>
                  <Text>Title: {dailyPhoto.title}</Text>
                  <Text>Description: {dailyPhoto.explanation}</Text>
                  <Text>Copyright: {dailyPhoto.copyright}</Text>
                  <Text>Date: {dailyPhoto.date}</Text>
                </View>
              </Page>
            </Document>
          </PDFViewer>
        </>
      ) : (
        <p style={{ color: "blue" }}>
          We can only render PDF from DailyPhotoCard and with proper data
        </p>
      )}
    </div>
  );
};

export default PDFView;
