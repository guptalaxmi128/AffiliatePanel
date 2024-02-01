import React from "react";
import { Breadcrumb, Collapse } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import "./FAQ.css";

const { Panel } = Collapse;

const FAQ = () => {
  return (
    <>
      <div className="faq-outer-container">
        <div className="faq-breadcrumb">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontSize: "22px",
                fontFamily: "Rajdhani",
                padding: 0,
                margin: 0,
              }}
            >
              Frequently Asked Questions
            </p>
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="/user">
                  <HomeOutlined />
                </a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>FAQs</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div className="faq">
          <div className="faq-container">
            <div className="faq-subcontainer">
              <h2>FAQs</h2>
              <Collapse accordion>
                <Panel header="Can I request a refund?" key="1">
                  <p style={{ fontFamily: "Rajdhani",textAlign:'justify' }}>
                    {" "}
                    No, Affiliate Indians has a strict No Refund Policy. Members
                    are not allowed under any circumstances to issue refunds as
                    all Affiliate Indians members are given instant access to
                    the members area and this access cannot be taken back.
                  </p>
                </Panel>
                <Panel
                  header="How many membership levels does Affiliate Indians have?"
                  key="2"
                >
                  <p style={{ fontFamily: "Rajdhani",textAlign:'justify' }}>
                    {" "}
                    There are five membership levels – Affiliate (Earnings ₹
                    Zero), Gold (Earnings ₹ 10,000), Platinum (Earning ₹
                    20,000), and Diamond (Earnings ₹ 1-Lakh+). You don’t have to
                    pay any fees for any of these levels. You have to just
                    purchased our product, and we will give you those membership
                    levels badges/ranks according to your earnings.
                  </p>
                </Panel>
                <Panel
                  header="Is there any extra Admin and One-On-One Advisor Fee?"
                  key="3"
                >
                  <p style={{ fontFamily: "Rajdhani" ,textAlign:'justify'}}>
                    {" "}
                    No, there is NO admin fee, nor advisor fee. You have to just
                    purchased any of our product, Admin and your one-on-one
                    advisor will help you for 100% FREE.
                  </p>
                </Panel>
                <Panel
                  header="What is the product? What does the product fee cover?"
                  key="4"
                >
                  <p style={{ fontFamily: "Rajdhani" ,textAlign:'justify'}}>
                    {" "}
                    The Affiliate Indians Replicated Website, Affiliate Indians
                    Marketing System which includes multiple capture & landing
                    pages and built in auto-responder emails plus 17 bonuses
                    make up the core product, known as AFFILIATE INDIANS
                    BLUEPRINT. Additionally, as a member, you will be given full
                    access to the Affiliate Indians Members Area that contains
                    additional training & resources. Everything you need to
                    launch your Affiliate Marketing business is located in the
                    Members Area. The Product fee also gives you resale rights
                    to Affiliate Indians products.
                  </p>
                </Panel>
                <Panel
                  header="Can I purchase any product of Affiliate Indians?"
                  key="5"
                >
                  <p style={{ fontFamily: "Rajdhani",textAlign:'justify' }}>
                    {" "}
                    Yes, you can purchase any product at any time. You'll need
                    to pay the full product fee for whatever product you are
                    purchasing.
                  </p>
                </Panel>
                <Panel header="Can I get paid on any product sold?" key="6">
                  <p style={{ fontFamily: "Rajdhani",textAlign:'justify' }}>
                    {" "}
                    Affiliate Indians members have resale rights for whatever
                    product they have purchased. So, if you've Affiliate Indians
                    Blueprint product, you can resale the same and so on.
                  </p>
                </Panel>
                <Panel
                  header=" What do I need to do to start making money?"
                  key="7"
                >
                  <p style={{ fontFamily: "Rajdhani",textAlign:'justify' }}>
                    {" "}
                    Affiliate Indians is perfect for newbies and those with
                    little to no technical skills. By simply copying the
                    pre-written ads/scripts and posting them on the Google,
                    YouTube, G-mail, online classified ad sites & social media
                    platforms, you can earn handsome amount of money for every
                    customer that purchases an Affiliate Indians product from
                    you. When a payment is made, you the sponsor, will receive
                    40% of that from us. You’ll also receive an email
                    notification letting you know that you have just signed up a
                    new member. Everything our members need to build a
                    profitable Affiliate Indians Business is located in the
                    Affiliate Indians Members Area!
                  </p>
                </Panel>
                <Panel
                  header="Is this a Scam or a Get Rich Quick Scheme?"
                  key="8"
                >
                  <p style={{ fontFamily: "Rajdhani",textAlign:'justify' }}>
                    {" "}
                    Absolutely Not! A get rich quick scheme (or scam) usually
                    promises to make a person extremely wealthy over a short
                    period of time, with very little effort and with little or
                    no risk. Affiliate Indians makes no such claims, nor do we
                    make a guarantee of income whatsoever. We know that
                    individual results can and will vary based on several
                    factors, including but not limited to, level of member
                    commitment and consistency of effort. Additionally,
                    Affiliate Indians provides a REAL product that contains ad
                    copy that can be used to promote Affiliate Indians, or any
                    other business being promoted by our members. Any
                    claims/presentation/testimonials on site does not mean we
                    are guaranteeing it. They should be considered as examples
                    only. We are not responsible for your earnings.
                  </p>
                </Panel>
                <Panel header="Is this a Pyramid Scheme?" key="9">
                  <p style={{ fontFamily: "Rajdhani",textAlign:'justify' }}>
                    {" "}
                    No. This is a direct sales program. You’ll earn 40% every
                    time you refer someone who purchases Affiliate Indians
                    Blueprint product or any other product. With a pyramid
                    scheme, as you go down the line of a company from top to
                    bottom, the person or people that start it or those who join
                    first make the most money, and as more and more people join,
                    the people at the top continue to make the most money while
                    the newest people make pennies or sometimes nothing at all.
                    <br/>
                    With Affiliate Indians, members earn a full 40% commission
                    for whatever product they sell (you must own the product to
                    earn the commission). A new person can earn thousands or
                    even ten thousands weekly and make more than someone who has
                    been a member longer. Also, any business where money changes
                    hands without the benefit of products or service is deemed a
                    pyramid scheme by the Govt. Affiliate Indians members
                    receive a product, a comprehensive online marketing Training
                    Course, a complete automated marketing system, including
                    multiple capture pages & landing pages, additional marketing
                    resources like custom prewritten/banner ads, and a fully
                    functional Members Area that is loaded with additional
                    training & resources. Last, but certainly not least, our
                    Members are paid directly from us. This is a
                    direct-sales/affiliate program.
                  </p>
                </Panel>
                <Panel header=" Is this a Matrix Program?" key="10">
                  <p style={{ fontFamily: "Rajdhani",textAlign:'justify' }}>
                    {" "}
                    No. Matrix programs, also known as money doublers, cyclers,
                    and randomizers have a commission system based on a
                    specified percentage of the member’s deposit or from
                    recruiting a specific number of down-line members before
                    they ever earn a dime. Usually you won’t receive a payout
                    until a matrix is filled or a line cycles. Affiliate Indians
                    is not a matrix program. All members earn a 40% commission
                    on products sold by them.
                  </p>
                </Panel>
                <Panel
                  header="Is this a Multi-Level Marketing Program?"
                  key="11"
                >
                  <p style={{ fontFamily: "Rajdhani",textAlign:'justify' }}>
                    {" "}
                    No. Multi-level marketing (MLM) is a marketing strategy in
                    which the sales force is compensated not only for sales they
                    personally generate, but also for the sales of the other
                    salespeople that they recruit. This recruited sales force is
                    referred to as the participant’s “down line “and can provide
                    multiple levels of compensation. MLM’s usually charge an
                    initial start-up cost to become a distributor which does not
                    include any product. Affiliate Indians is NOT an MLM
                    program. The buyer pays a one-time fee directly to Affiliate
                    Indians depending on the Affiliate Indians’ product they are
                    purchasing. All members receive immediate access to
                    Affiliate Indians products & the Members Training Area.
                  </p>
                </Panel>
                <Panel
                  header=" Is there a guarantee that I'll make money?"
                  key="12"
                >
                  <p style={{ fontFamily: "Rajdhani",textAlign:'justify' }}>
                    {" "}
                    No. There is no guarantee you will make money. You and you
                    alone will determine your level of success based on your own
                    actions. As stipulated by law, we cannot and do not make any
                    guarantees about your ability to get results or earn any
                    money with our affiliate program, information, tools or
                    strategies.<br />
                     This is not a get rich quick program nor do we
                    believe in overnight success. We believe in hard work,
                    integrity and developing your skills if you want to earn
                    more financially.
                  </p>
                </Panel>
                <Panel header="When do I get paid?" key="13">
                  <p style={{ fontFamily: "Rajdhani",textAlign:'justify' }}>
                    {" "}
                    You get paid after completing 7 days of your sales.
                  </p>
                </Panel>
                <Panel
                  header="Do I have to pay taxes on my earnings with Affiliate Indians?"
                  key="14"
                >
                  <p style={{ fontFamily: "Rajdhani",textAlign:'justify' }}>
                    {" "}
                    Yes. Since you will be receiving payments directly from us,
                    you are responsible for paying your own taxes. Depending on
                    your earning limit, you may pay Income Tax to government.
                    Please consult with a tax professional for tax and legal
                    advice.
                  </p>
                </Panel>
                <Panel
                  header="Can I work this program from outside the US?"
                  key="15"
                >
                  <p style={{ fontFamily: "Rajdhani" ,textAlign:'justify'}}>
                    {" "}
                    Yes, as long as you have your bank account in India, you can
                    work with this program. All you need to have is a computer
                    and access to the internet and our product’s fee.
                  </p>
                </Panel>
              </Collapse>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
