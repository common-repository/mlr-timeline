==== Horizontal Timeline Shortcode ====



Contributors: ersatzpole

Donate link: http://matthewlillistone.co.uk/?page_id=785

Tags: text, php, plugin, shortcode, posts, timeline, jquery

Requires at least: 2.8


Tested up to: 4.0.1

Stable tag: 1.4

License: Released under GNU GENERAL PUBLIC LICENSE version 2

This plugin displays a horizontal timeline of posts in your page/post. 


== Description ==
* This plugin generates a shortcode to dynamically display a horizontal jquery timeline of posts in your page/post.
* Displays an excerpt of each post under the date shown above.  
* Five different display methods to choose from on options page.
* Option to choose if the timeline begins at the oldest or newest post.
* Timeline will fit smaller screen-widths on refresh or page load if on small-screen device.
* See the 'other notes' tab for shortcode instructions.
* The plugin works on every theme I have tried it with and is compatible with the latest version of Wordpress.
 

== Installation ==

**Install like any other basic plugin:**

1. Unzip and copy the mlr-timeline folder to your /wp-content/plugins/ folder

 or upload .zip file from wordpress plugin uploader 


2.Activate the MLR Timeline on your plugin-page.




== How to use ==


Put this shortcode in your post or pages

[ml_timeline] The default shortcode will display all posts.

*category_name="Your-category-slug"* 

[ml_timeline category_name="Your-category-slug"] Will display posts from a specific category or categories. Separate category slugs by commas.

== Changelog ==

1.4 Added Grid scroll method, fixed synchronisation of jquery animation. Removed superfluous css and code.

1.3 Added Hybrid method, fixed issue with some titles not showing on previous and next buttons.

1.2 Added Rotary method, changed function names on options page so as to be more specificto the plugin. 
Added option on options page to choose where the timeline initiates: oldest / most recent. 

1.1 Added plugin class, alternative scroll method and options page to choose between the two.

1.0 Initial Release

== Upgrade Notice ==

Another display method added. An improvement called hybrid.

== Screenshots ==

http://plugins.svn.wordpress.org/mlr-timeline/assets/mlr-timeline-screenshot.jpg
http://plugins.svn.wordpress.org/mlr-timeline/assets/mlr-timeline-screenshot-alt.jpg
http://plugins.svn.wordpress.org/mlr-timeline/assets/mlr-timeline-screenshot-hybrid-mobile.jpg

== Frequently Asked Questions ==

None Yet.

**style it**

Easy things to style are the Year, month and postmarker elements.

Example: 

#timeline-title {display:none;} // removes title from top of timeline.
p.pyear {color:#000;font-size:2em;}
p.pmonth {color:#929292; font-size:1.3em;}
.timeline-container i {color:red;} // styles all the icons colour property.
ul#day_list {border-color:#929292;} // styles border line color
ul#day_list .post-marker {border-color:#929292;} // styles date marker line color

For more info or a sample, please visit http://matthewlillistone.co.uk/?page_id=785