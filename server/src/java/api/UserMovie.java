/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package api;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author iwitlk
 */
@Entity
@Table(name = "user_movie")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "UserMovie.findAll", query = "SELECT u FROM UserMovie u")
    , @NamedQuery(name = "UserMovie.findByUserMovieId", query = "SELECT u FROM UserMovie u WHERE u.userMovieId = :userMovieId")})
public class UserMovie implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "userMovieId")
    private Integer userMovieId;
    @JoinColumn(name = "movieId", referencedColumnName = "movieId")
    @ManyToOne(optional = false)
    private Movie movieId;
    @JoinColumn(name = "userId", referencedColumnName = "userId")
    @ManyToOne(optional = false)
    private User userId;

    public UserMovie() {
    }

    public UserMovie(Integer userMovieId) {
        this.userMovieId = userMovieId;
    }

    public Integer getUserMovieId() {
        return userMovieId;
    }

    public void setUserMovieId(Integer userMovieId) {
        this.userMovieId = userMovieId;
    }

    public Movie getMovieId() {
        return movieId;
    }

    public void setMovieId(Movie movieId) {
        this.movieId = movieId;
    }

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (userMovieId != null ? userMovieId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof UserMovie)) {
            return false;
        }
        UserMovie other = (UserMovie) object;
        if ((this.userMovieId == null && other.userMovieId != null) || (this.userMovieId != null && !this.userMovieId.equals(other.userMovieId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "api.UserMovie[ userMovieId=" + userMovieId + " ]";
    }
    
}
