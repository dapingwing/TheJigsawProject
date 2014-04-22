package jwget;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.CookieHandler;
import java.net.CookieManager;
import java.net.CookiePolicy;
import java.net.CookieStore;
import java.net.HttpCookie;
import java.net.URL;
import java.net.URLConnection;
import java.util.*;

import org.json.*;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Element;
import org.jsoup.select.*;

public class jwget {

	public static ArrayList<Notification> gnotifs;

	//You can comment out main for when intergrating into android app, it is merely for demo purposes
	public static void main(String[] args) throws IOException {
		// TODO Auto-generated method stub
		 //tests
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter login E-mail: ");
		String email = sc.nextLine();
		System.out.println("Enter password: ");
		String password = sc.nextLine();
		
		//login and get client object
		HttpClientUtil client = login(email, password);
		
		//get current list of notifications
		ArrayList<Notification> notifs = getNotifications(client, "1691");
		
		//check return list of notifications against current known list, to know when a new notification arrives
		for (Notification notif : notifs) {
			if (!lIdScan(notif)) {
				//signal user in some way of new notification
				gnotifs.add(notif);
			}
			System.out.println(notif.toString());
		}
		
		client.close();
	}
	
	//simple linear scan to find if notification is new
	private static boolean lIdScan(Notification notif) {
		for (int i=0; i<gnotifs.size(); i++) {
			if (gnotifs.get(i).id.equals(notif.id)) 
				return true;
		}
		return false;
	}
	
	public static HttpClientUtil login(String email, String password) {
		HttpClientUtil client = new HttpClientUtil();
        String html = client.getPage("http://pegasus.astroempires.com/");
        
        String result = client.loginToAE(html, email, password);
       
        return client;
	}

	public static ArrayList<Notification> getNotifications(HttpClientUtil client, String playerid) {
		ArrayList<Notification> notifs = new ArrayList<Notification>();
		String html = client.getPage("http://pegasus.astroempires.com/notifications_ajax.aspx?method=ajax&player=" + playerid + "&version=1");
		
		org.jsoup.nodes.Document doc = Jsoup.parse(html);
		
		Elements nots = doc.getElementsByTag("notification");
		
		for (Element elem : nots) {
			Integer id = Integer.parseInt(elem.attr("id"));
			String type = elem.child(0).text();
			String info = elem.child(1).text();
			String url = elem.child(2).text();
			notifs.add(new Notification(id, type, info, url));
		}
		
		return notifs;
	}
	
}
